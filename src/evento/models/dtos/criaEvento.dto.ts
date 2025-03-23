import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  data: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  horario: string;

  @IsNumber({ maxDecimalPlaces: 5 })
  @IsNotEmpty()
  @ApiProperty()
  capacidade: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  localizacao: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty()
  valor: number;
}
