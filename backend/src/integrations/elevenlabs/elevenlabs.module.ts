import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElevenLabsService } from './elevenlabs.service';
import { ElevenLabsWebhookController } from './elevenlabs-webhook.controller';
import { ElevenLabsWebhookService } from './elevenlabs-webhook.service';
import { S3Module } from '../s3/s3.module';
import { MistralModule } from '../mistral/mistral.module';
import { AudioModule } from '../audio/audio.module';
import { StoriesModule } from '../../stories/stories.module';
import { Conversation } from '../../conversations/conversation.entity';
import { VoiceProfile } from '../../voice/voice-profile.entity';

@Module({
  imports: [
    ConfigModule,
    S3Module,
    MistralModule,
    AudioModule,
    forwardRef(() => StoriesModule),
    TypeOrmModule.forFeature([Conversation, VoiceProfile]),
  ],
  controllers: [ElevenLabsWebhookController],
  providers: [ElevenLabsService, ElevenLabsWebhookService],
  exports: [ElevenLabsService, ElevenLabsWebhookService],
})
export class ElevenLabsModule {}
