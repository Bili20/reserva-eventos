import { CriaUsuarioDto } from '../dtos/criaUsuario.dto';
import { UsuarioEntity } from '../entities/usuario.entity';

export interface IUsuarioRepo {
  criar(param: UsuarioEntity): Promise<void>;
}
