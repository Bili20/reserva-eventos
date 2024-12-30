import { UsuarioEntity } from '../entities/usuario.entity';

export interface IUsuarioRepo {
  criar(param: UsuarioEntity): Promise<void>;
  buscaPorEmail(param: string): Promise<UsuarioEntity>;
}
