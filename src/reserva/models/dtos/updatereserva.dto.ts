import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

export class UpdatereservaDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  evento_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quantidade: number;

  @IsNotEmpty()
  @ApiProperty()
  usuario: Payload;
}
