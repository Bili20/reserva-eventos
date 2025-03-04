import { IsNumber } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';

export class BuscaEventoUsuarioDto {
  @IsNumber()
  @IsOptional()
  usuario_id?: number;

  @IsOptional()
  @IsNumber()
  id?: number;
}
