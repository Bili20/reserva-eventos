import { IsNumber } from '@nestjs/class-validator';
import { IsNotEmpty } from 'class-validator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

export class DescontoCapacidadeDto {
  @IsNumber()
  @IsNotEmpty()
  evento_id: number;

  @IsNumber()
  @IsNotEmpty()
  quantidade: number;

  @IsNotEmpty()
  usuario: Payload;
}
