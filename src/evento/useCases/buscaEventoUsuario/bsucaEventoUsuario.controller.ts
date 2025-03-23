import { Body, Controller, Get, Inject } from '@nestjs/common';
import { BuscaEventoUsuarioUseCase } from './buscaEventoUsuario.use-case';
import { BuscaEventoUsuarioDto } from 'src/evento/models/dtos/buscaEventoUsuario.dto';
import { UsuarioAtual } from 'src/autenticacao/decorator/usuarioAtual.decorator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Evento')
@Controller('eventos/usuario')
export class BuscaEventoUsuarioController {
  @Inject(BuscaEventoUsuarioUseCase)
  private readonly buscaEventoUsuarioUseCase: BuscaEventoUsuarioUseCase;

  @ApiOperation({
    summary: 'Rota resposanvel por buscar todos os eventos do usuario.',
  })
  @Get()
  async busca(
    @Body() param: BuscaEventoUsuarioDto,
    @UsuarioAtual() usuario: Payload,
  ) {
    param.usuario_id = usuario.sub;
    return await this.buscaEventoUsuarioUseCase.execute(param);
  }
}
