import { IsNumber } from '@nestjs/class-validator';
import { IsNotEmpty } from 'class-validator';

export class BuscaEventoUsuarioDto {
  @IsNumber()
  @IsNotEmpty()
  usuario_id: number;
}
