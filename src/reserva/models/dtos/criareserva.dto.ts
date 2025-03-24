import { IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

export class CriaReservaDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  evento_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'quantidade que pretende reservar.' })
  quantidade: number;

  @IsOptional()
  usuario?: Payload;
}
