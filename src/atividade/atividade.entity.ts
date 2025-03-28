import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('atividades')
export class Atividade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ nullable: true })
  status: string;

  @Column({ name: 'data_criacao', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @Column({ name: 'data_atualizacao', nullable: true })
  dataAtualizacao: Date;

  @Column({ nullable: true })
  responsavel: string;

  @Column({ nullable: true })
  prioridade: string;
}