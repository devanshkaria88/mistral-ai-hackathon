import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyGroup } from './family-group.entity';
import { FamilyController } from './family.controller';
import { FamilyService } from './family.service';
import { User } from '../users/user.entity';
import { VoiceProfile } from '../voice/voice-profile.entity';
import { Story } from '../stories/story.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyGroup, User, VoiceProfile, Story])],
  controllers: [FamilyController],
  providers: [FamilyService],
  exports: [FamilyService],
})
export class FamilyModule {}
