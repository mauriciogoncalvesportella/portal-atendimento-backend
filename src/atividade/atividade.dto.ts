import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateAtividadeDto {
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  titulo: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  responsavel?: string;

  @IsString()
  @IsOptional()
  prioridade?: string;
}

export class UpdateAtividadeDto {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  responsavel?: string;

  @IsString()
  @IsOptional()
  prioridade?: string;
}