import { IsString } from '@nestjs/class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class AtualizaEventoDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  descricao?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  data?: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  horario?: string;

  @IsNumber({ maxDecimalPlaces: 5 })
  @IsOptional()
  @ApiPropertyOptional()
  capacidade?: number;

  @IsNumber()
  @IsOptional()
  capacidadeSobrando?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  localizacao?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  valor?: number;

  @IsString()
  @IsOptional()
  imagem?: string;
}
