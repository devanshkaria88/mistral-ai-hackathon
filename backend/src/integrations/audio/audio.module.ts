import { Module } from '@nestjs/common';
import { AudioExtractionService } from './audio-extraction.service';

@Module({
  providers: [AudioExtractionService],
  exports: [AudioExtractionService],
})
export class AudioModule {}
