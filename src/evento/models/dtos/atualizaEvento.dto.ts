import { IsString } from '@nestjs/class-validator';
import { IsNumber, IsOptional } from 'class-validator';

export class AtualizaEventoDto {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsOptional()
  @IsString()
  data?: Date;

  @IsString()
  @IsOptional()
  horario?: string;

  @IsNumber({ maxDecimalPlaces: 5 })
  @IsOptional()
  capacidade?: number;

  @IsString()
  @IsOptional()
  localizacao?: string;

  @IsNumber()
  @IsOptional()
  valor?: number;

  @IsString()
  @IsOptional()
  imagem?: string;
}
