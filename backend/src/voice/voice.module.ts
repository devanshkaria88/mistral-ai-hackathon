import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoiceProfile } from './voice-profile.entity';
import { VoiceController } from './voice.controller';
import { VoiceService } from './voice.service';
import { S3Module } from '../integrations/s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoiceProfile]),
    S3Module,
  ],
  controllers: [VoiceController],
  providers: [VoiceService],
  exports: [VoiceService],
})
export class VoiceModule {}
