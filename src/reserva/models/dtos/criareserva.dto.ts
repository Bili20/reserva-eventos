import { IsNumber } from '@nestjs/class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

export class CriaReservaDto {
  @IsNumber()
  evento_id: number;

  @IsOptional()
  usuario?: Payload;

  @IsOptional()
  valor?: number;
}
