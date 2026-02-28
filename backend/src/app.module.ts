import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';

import { CommonModule } from './common/common.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConversationsModule } from './conversations/conversations.module';
import { StoriesModule } from './stories/stories.module';
import { PersonaModule } from './persona/persona.module';
import { FamilyModule } from './family/family.module';
import { VoiceModule } from './voice/voice.module';
import { IntegrationsModule } from './integrations/integrations.module';

import { User } from './users/user.entity';
import { FamilyGroup } from './family/family-group.entity';
import { Conversation } from './conversations/conversation.entity';
import { Story } from './stories/story.entity';
import { Person, Place, Theme } from './stories/entities';
import { VoiceProfile } from './voice/voice-profile.entity';
import { PersonaMessage } from './persona/persona-message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [
          User,
          FamilyGroup,
          Conversation,
          Story,
          Person,
          Place,
          Theme,
          VoiceProfile,
          PersonaMessage,
        ],
        synchronize: false,
        logging: configService.get<string>('nodeEnv') === 'development',
        retryAttempts: 3,
        retryDelay: 3000,
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    AuthModule,
    UsersModule,
    ConversationsModule,
    StoriesModule,
    PersonaModule,
    FamilyModule,
    VoiceModule,
    IntegrationsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
