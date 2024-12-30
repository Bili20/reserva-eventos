import { AutenticacaoDto } from '../dtos/login.dto';

export interface IAutenticacao {
  login(param: AutenticacaoDto): Promise<string>;
}
