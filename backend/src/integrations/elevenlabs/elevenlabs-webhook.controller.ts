import {
  Controller,
  Post,
  Body,
  Logger,
  HttpCode,
  HttpStatus,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ElevenLabsWebhookDto, WebhookResponseDto, WebhookEventType } from './dto/webhook.dto';
import { ElevenLabsWebhookService } from './elevenlabs-webhook.service';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Webhooks')
@Controller('webhooks/elevenlabs')
@Public()
export class ElevenLabsWebhookController {
  private readonly logger = new Logger(ElevenLabsWebhookController.name);
  private readonly webhookSecret: string;

  constructor(
    private readonly webhookService: ElevenLabsWebhookService,
    private readonly configService: ConfigService,
  ) {
    this.webhookSecret = this.configService.get<string>('elevenlabs.webhookSecret') || '';
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Handle ElevenLabs webhook events',
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook processed successfully',
    type: WebhookResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid webhook signature',
  })
  async handleWebhook(
    @Body() payload: any,
    @Headers('elevenlabs-signature') elevenLabsSignature?: string,
    @Headers('x-elevenlabs-signature') xElevenLabsSignature?: string,
  ): Promise<WebhookResponseDto> {
    const eventType = payload.type || payload.event_type;
    const conversationId = payload.data?.conversation_id || payload.conversation_id;
    const signature = elevenLabsSignature || xElevenLabsSignature;
    
    this.logger.log(`Received ElevenLabs webhook: ${eventType} for conversation ${conversationId}`);
    this.logger.debug(`Full webhook payload: ${JSON.stringify(payload, null, 2)}`);
    this.logger.debug(`Webhook headers - elevenlabs-signature: ${elevenLabsSignature}, x-elevenlabs-signature: ${xElevenLabsSignature}`);

    // Verify webhook signature if secret is configured AND signature is provided
    if (this.webhookSecret && signature) {
      if (!this.verifySignature(signature)) {
        this.logger.warn(`Invalid webhook signature for conversation ${conversationId}`);
        throw new UnauthorizedException('Invalid webhook signature');
      }
      this.logger.log('Webhook signature verified successfully');
    } else if (this.webhookSecret && !signature) {
      this.logger.warn('Webhook secret configured but no signature header received - processing anyway');
    }

    try {
      // Handle post_call_transcription (transcript data)
      if (eventType === 'post_call_transcription') {
        return await this.webhookService.handlePostCallTranscription(payload);
      }

      // Handle post_call_audio (audio URL)
      if (eventType === 'post_call_audio') {
        return await this.webhookService.handlePostCallAudio(payload);
      }

      // Handle legacy conversation_ended events
      if (eventType === 'conversation_ended' || eventType === WebhookEventType.CONVERSATION_ENDED) {
        return await this.webhookService.handleConversationEnded(payload);
      }

      // Handle conversation started events
      if (eventType === 'conversation_started' || eventType === WebhookEventType.CONVERSATION_STARTED) {
        this.logger.log(`Conversation started: ${conversationId}`);
        return {
          success: true,
          message: 'Conversation started event received',
          conversationId,
        };
      }

      // Unknown event type - still return success to avoid retries
      this.logger.log(`Ignoring event type: ${eventType}`);
      return {
        success: true,
        message: `Event received but not processed: ${eventType}`,
      };
    } catch (error) {
      this.logger.error(`Error processing webhook: ${error.message}`, error.stack);
      return {
        success: false,
        message: `Error processing webhook: ${error.message}`,
      };
    }
  }

  private verifySignature(signature: string | undefined): boolean {
    if (!signature || !this.webhookSecret) {
      return false;
    }

    try {
      // Parse signature header: t=timestamp,v0=hash
      const parts = signature.split(',');
      const timestampPart = parts.find(p => p.startsWith('t='));
      const signaturePart = parts.find(p => p.startsWith('v0='));

      if (!timestampPart || !signaturePart) {
        this.logger.error('Invalid signature format');
        return false;
      }

      const timestamp = timestampPart.substring(2);
      const providedSignature = signaturePart.substring(3); // Remove 'v0=' prefix

      // Validate timestamp (reject requests older than 30 minutes)
      const reqTimestamp = parseInt(timestamp) * 1000;
      const tolerance = Date.now() - 30 * 60 * 1000;
      if (reqTimestamp < tolerance) {
        this.logger.error('Webhook request expired');
        return false;
      }

      // For now, skip actual HMAC verification since we need the raw body
      // This will be implemented when we add raw body parsing
      this.logger.warn('Signature timestamp validated, but HMAC verification not yet implemented');
      return true;

    } catch (error) {
      this.logger.error('Webhook signature verification failed:', error);
      return false;
    }
  }
}
