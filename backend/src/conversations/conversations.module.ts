import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { Conversation } from './conversation.entity';
import { IntegrationsModule } from '../integrations/integrations.module';
import { UsersModule } from '../users/users.module';
import { StoriesModule } from '../stories/stories.module';
import { VoiceModule } from '../voice/voice.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    IntegrationsModule,
    UsersModule,
    forwardRef(() => StoriesModule),
    VoiceModule,
  ],
  providers: [ConversationsService],
  controllers: [ConversationsController],
  exports: [ConversationsService],
})
export class ConversationsModule {}
