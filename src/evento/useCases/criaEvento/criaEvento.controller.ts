import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CriaEventoUseCase } from './criaEvento.use-case';
import { CriaEventoDto } from 'src/evento/models/dtos/criaEvento.dto';
import { UsuarioAtual } from 'src/autenticacao/decorator/usuarioAtual.decorator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

@Controller('evento')
export class CriaEventoController {
  @Inject(CriaEventoUseCase)
  private readonly criaEventoUseCase: CriaEventoUseCase;

  @Post()
  async criar(@Body() param: CriaEventoDto, @UsuarioAtual() usuario: Payload) {
    await this.criaEventoUseCase.execute(param, usuario);
  }
}
