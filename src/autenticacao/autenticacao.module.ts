import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LoginController } from './useCases/login/login.controller';
import { LoginUseCase } from './useCases/login/login.use-case';
import * as dotenv from 'dotenv';
import { ValidaUsuario } from './useCases/validaUsuario/validaUsuario';
dotenv.config();
@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [LoginUseCase, ValidaUsuario],
  controllers: [LoginController],
})
export class AutenticacaoModule {}
