import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaMessage } from './persona-message.entity';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonaMessage])],
  controllers: [PersonaController],
  providers: [PersonaService],
  exports: [PersonaService],
})
export class PersonaModule {}
