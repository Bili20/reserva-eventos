import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';
import { AutenticacaoDto } from '../../models/dtos/login.dto';
import { ValidaUsuario } from '../validaUsuario/validaUsuario';

@Injectable()
export class LoginUseCase {
  @Inject(JwtService) private readonly jwtService: JwtService;
  @Inject(ValidaUsuario)
  private readonly validaUsuario: ValidaUsuario;

  async execute(param: AutenticacaoDto) {
    const usuario = await this.validaUsuario.execute(param);
    const payload = { sub: usuario.id, username: usuario.email } as Payload;

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
