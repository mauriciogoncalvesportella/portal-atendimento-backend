import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtividadeController } from './atividade.controller';
import { AtividadeService } from './atividade.service';
import { Atividade } from './atividade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Atividade])],
  controllers: [AtividadeController],
  providers: [AtividadeService],
  exports: [AtividadeService],
})
export class AtividadeModule {}