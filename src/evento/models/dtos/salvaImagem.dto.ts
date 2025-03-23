import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SalvaImagemDto {
  @IsOptional()
  @ApiProperty()
  imagem: Express.Multer.File;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty()
  evento_id: number;
}
