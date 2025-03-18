import { IsNumber } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class BuscaTodosEventosDto {
  @IsNumber()
  @Type(() => Number)
  pagina: number;

  @IsNumber()
  @Type(() => Number)
  quantidade: number;
}
