import { Module } from '@nestjs/common';
import { WandbService } from './wandb.service';

@Module({
  providers: [WandbService],
  exports: [WandbService],
})
export class WandbModule {}
