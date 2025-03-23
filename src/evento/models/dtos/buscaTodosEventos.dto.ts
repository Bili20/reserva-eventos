import { IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BuscaTodosEventosDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  pagina: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  quantidade: number;
}
