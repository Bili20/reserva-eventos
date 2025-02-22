import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class SalvaImagemDto {
  @IsNotEmpty()
  imagem: Express.Multer.File;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  evento_id: number;
}
