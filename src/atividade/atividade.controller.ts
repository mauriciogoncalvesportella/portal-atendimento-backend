import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { Atividade } from './atividade.entity';

@Controller('atividades')
export class AtividadeController {
  constructor(private readonly atividadeService: AtividadeService) {}

  @Get()
  async findAll(): Promise<Atividade[]> {
    try {
      return await this.atividadeService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao buscar atividades',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Atividade> {
    try {
      return await this.atividadeService.findOne(id);
    } catch (error) {
      if (error.name === 'NotFoundException') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        error.message || 'Erro ao buscar atividade',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() atividadeData: Partial<Atividade>): Promise<Atividade> {
    try {
      return await this.atividadeService.create(atividadeData);
    } catch (error) {
      if (error.name === 'BadRequestException') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        error.message || 'Erro ao criar atividade',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() atividadeData: Partial<Atividade>,
  ): Promise<Atividade> {
    try {
      return await this.atividadeService.update(id, atividadeData);
    } catch (error) {
      if (error.name === 'NotFoundException') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      if (error.name === 'BadRequestException') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        error.message || 'Erro ao atualizar atividade',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ success: boolean }> {
    try {
      const result = await this.atividadeService.remove(id);
      return { success: result };
    } catch (error) {
      if (error.name === 'NotFoundException') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        error.message || 'Erro ao excluir atividade',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}