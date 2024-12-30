import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IUsuarioRepo } from 'src/usuario/models/interfaces/usuarioRepo.interface';
import { CriaUsuarioDto } from 'src/usuario/models/dtos/criaUsuario.dto';
import { UsuarioEntity } from 'src/usuario/models/entities/usuario.entity';

@Injectable()
export class CriaUsuarioUseCase {
  @Inject('IUsuarioRepo') private readonly usuarioRepo: IUsuarioRepo;

  async execute(param: CriaUsuarioDto) {
    try {
      const usuario = new UsuarioEntity(param.nome, param.email, param.senha);
      usuario.encriptaSenha(param.senha);
      await this.usuarioRepo.criar(usuario);
    } catch (e) {
      if (e.code == '23505') {
        e.response = 'Email já cadastrado.';
        e.status = 400;
      }

      throw new HttpException(
        e.response ?? new InternalServerErrorException(e),
        e.status ?? 500,
      );
    }
  }
}
