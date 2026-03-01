import { Module } from '@nestjs/common';
import { BedrockModule } from './bedrock/bedrock.module';
import { ElevenLabsModule } from './elevenlabs/elevenlabs.module';
import { FirebaseModule } from './firebase/firebase.module';
import { WandbModule } from './wandb/wandb.module';
import { MistralModule } from './mistral/mistral.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [BedrockModule, ElevenLabsModule, FirebaseModule, WandbModule, MistralModule, S3Module],
  exports: [BedrockModule, ElevenLabsModule, FirebaseModule, WandbModule, MistralModule, S3Module],
})
export class IntegrationsModule {}
