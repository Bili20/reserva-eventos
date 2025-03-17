import { IsNotEmpty } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class BuscaUmEventoUsuarioDto {
  @IsNumber()
  @IsNotEmpty()
  usuario_id: number;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}
