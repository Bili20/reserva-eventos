import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CriaUsuarioUseCase } from './criaUsuario.use-case';
import { CriaUsuarioDto } from 'src/usuario/models/dtos/criaUsuario.dto';
import { IsPublic } from 'src/autenticacao/decorator/tornaRotaPublica.decorator';
@IsPublic()
@Controller('usuario')
export class CriaUsuarioController {
  @Inject(CriaUsuarioUseCase)
  private readonly criaUsuarioUseCase: CriaUsuarioUseCase;

  @Post()
  async criar(@Body() param: CriaUsuarioDto) {
    await this.criaUsuarioUseCase.execute(param);
  }
}
