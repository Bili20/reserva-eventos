import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './models/entities/usuario.entity';
import { UsuarioRepo } from './repository/usuarioRepo';
import { CriaUsuarioUseCase } from './useCases/criaUsuario/criaUsuario.use-case';
import { CriaUsuarioController } from './useCases/criaUsuario/craiusuario.controller';
import { BuscaPorEmailUseCase } from './useCases/buscaPorEmail/buscaPorEmail.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  providers: [
    CriaUsuarioUseCase,
    BuscaPorEmailUseCase,
    UsuarioRepo,
    { provide: 'IUsuarioRepo', useExisting: UsuarioRepo },
  ],
  controllers: [CriaUsuarioController],
  exports: [BuscaPorEmailUseCase],
})
export class UsuarioModule {}
