import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

export class CancelaReservaDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  evento_id: number;

  @IsOptional()
  usuario: Payload;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quantidade: number;
}
