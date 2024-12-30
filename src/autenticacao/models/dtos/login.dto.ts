import { IsNotEmpty, IsString } from 'class-validator';

export class AutenticacaoDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
