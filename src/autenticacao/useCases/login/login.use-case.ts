import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AutenticacaoDto } from '../../models/dtos/login.dto';
import { BuscaPorEmailUseCase } from 'src/usuario/useCases/buscaPorEmail/buscaPorEmail.use-case';

@Injectable()
export class LoginUseCase {
  @Inject(JwtService) private readonly jwtService: JwtService;
  @Inject(BuscaPorEmailUseCase)
  private readonly buscaPorEmailUseCase: BuscaPorEmailUseCase;

  async execute(param: AutenticacaoDto) {
    await this.validaUsuario(param);
    const payload = { username: param.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async validaUsuario(param: AutenticacaoDto) {
    const usuario = await this.buscaPorEmailUseCase.execute(param.email);

    if (!usuario || !usuario.comparaSenha(param.senha, usuario.senha)) {
      throw new UnauthorizedException({
        messgae: 'Usuário ou senha invalidos.',
      });
    }
  }
}
