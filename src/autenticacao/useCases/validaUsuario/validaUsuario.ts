import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AutenticacaoDto } from 'src/autenticacao/models/dtos/login.dto';
import { BuscaPorEmailUseCase } from 'src/usuario/useCases/buscaPorEmail/buscaPorEmail.use-case';

@Injectable()
export class ValidaUsuario {
  @Inject(BuscaPorEmailUseCase)
  private readonly buscaPorEmailUseCase: BuscaPorEmailUseCase;

  async execute(param: AutenticacaoDto) {
    const usuario = await this.buscaPorEmailUseCase.execute(param.email);

    if (!usuario || !usuario.comparaSenha(param.senha, usuario.senha)) {
      throw new UnauthorizedException({
        messgae: 'Usuário ou senha invalidos.',
      });
    }
    return usuario;
  }
}
