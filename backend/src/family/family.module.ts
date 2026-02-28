import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyGroup } from './family-group.entity';
import { FamilyController } from './family.controller';
import { FamilyService } from './family.service';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyGroup])],
  controllers: [FamilyController],
  providers: [FamilyService],
  exports: [FamilyService],
})
export class FamilyModule {}
