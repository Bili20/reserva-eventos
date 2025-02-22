import { IsString } from '@nestjs/class-validator';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CriaEventoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  data: Date;

  @IsString()
  @IsNotEmpty()
  horario: string;

  @IsNumber({ maxDecimalPlaces: 5 })
  @IsNotEmpty()
  capacidade: number;

  @IsString()
  @IsNotEmpty()
  localizacao: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  valor: number;
}
