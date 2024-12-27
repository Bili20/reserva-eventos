import { IsString } from '@nestjs/class-validator';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CriaUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  senha: string;
}
