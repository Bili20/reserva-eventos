import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './models/entities/usuario.entity';
import { UsuarioRepo } from './repository/usuarioRepo';
import { CriaUsuarioUseCase } from './useCases/criaUsuario.use-case';
import { CriaUsuarioController } from './useCases/craiusuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  providers: [
    CriaUsuarioUseCase,
    UsuarioRepo,
    { provide: 'IUsuarioRepo', useExisting: UsuarioRepo },
  ],
  controllers: [CriaUsuarioController],
})
export class UsuarioModule {}
