import { Body, Controller, Get, Inject } from '@nestjs/common';
import { BuscaEventoUsuarioUseCase } from './buscaEventoUsuario.use-case';
import { BuscaEventoUsuarioDto } from 'src/evento/models/dtos/buscaEventoUsuario.dto';
import { UsuarioAtual } from 'src/autenticacao/decorator/usuarioAtual.decorator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

@Controller('eventos/usuario')
export class BuscaEventoUsuarioController {
  @Inject(BuscaEventoUsuarioUseCase)
  private readonly buscaEventoUsuarioUseCase: BuscaEventoUsuarioUseCase;

  @Get()
  async busca(
    @Body() param: BuscaEventoUsuarioDto,
    @UsuarioAtual() usuario: Payload,
  ) {
    param.usuario_id = usuario.sub;
    return await this.buscaEventoUsuarioUseCase.execute(param);
  }
}
