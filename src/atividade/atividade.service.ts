import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Atividade } from './atividade.entity';

@Injectable()
export class AtividadeService {
  constructor(
    @InjectRepository(Atividade)
    private atividadeRepository: Repository<Atividade>,
  ) {}

  async findAll(): Promise<Atividade[]> {
    return this.atividadeRepository.find();
  }

  async findOne(id: number): Promise<Atividade> {
    const atividade = await this.atividadeRepository.findOne({ where: { id } });
    if (!atividade) {
      throw new NotFoundException(`Atividade com ID ${id} não encontrada`);
    }
    return atividade;
  }

  async create(atividadeData: Partial<Atividade>): Promise<Atividade> {
    // Verificar se já existe uma atividade com o mesmo título
    const tituloExistente = await this.atividadeRepository.findOne({
      where: { titulo: atividadeData.titulo },
    });

    if (tituloExistente) {
      throw new BadRequestException(`Já existe uma atividade com o título "${atividadeData.titulo}"`);
    }

    // Criar nova atividade
    const novaAtividade = this.atividadeRepository.create({
      ...atividadeData,
      dataCriacao: new Date(),
    });

    return this.atividadeRepository.save(novaAtividade);
  }

  async update(id: number, atividadeData: Partial<Atividade>): Promise<Atividade> {
    // Verificar se a atividade existe
    const atividade = await this.findOne(id);

    // Verificar se já existe outra atividade com o mesmo título
    if (atividadeData.titulo) {
      const tituloExistente = await this.atividadeRepository.findOne({
        where: { titulo: atividadeData.titulo },
      });
      
      if (tituloExistente && tituloExistente.id !== id) {
        throw new BadRequestException(`Já existe uma atividade com o título "${atividadeData.titulo}"`);
      }
    }

    // Atualizar a atividade
    Object.assign(atividade, {
      ...atividadeData,
      dataAtualizacao: new Date(),
    });

    return this.atividadeRepository.save(atividade);
  }

  async remove(id: number): Promise<boolean> {
    // Verificar se a atividade existe
    await this.findOne(id);

    // Remover a atividade
    const result = await this.atividadeRepository.delete(id);
    
    // Retornar true se a exclusão foi bem-sucedida
    return result.affected > 0;
  }
}