import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SalvaImagemDto {
  @IsOptional()
  imagem: Express.Multer.File;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  evento_id: number;
}
