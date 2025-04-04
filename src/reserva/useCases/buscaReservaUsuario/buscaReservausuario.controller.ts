import { Controller, Get, Param } from '@nestjs/common';
import { BuscaReservaUsuarioUseCase } from './buscaReservaUsuario.use-case';
import { UsuarioAtual } from 'src/autenticacao/decorator/usuarioAtual.decorator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

@Controller('reserva')
export class BuscaReservaUsuarioController {
  constructor(
    private readonly buscaReservaUsuarioUseCase: BuscaReservaUsuarioUseCase,
  ) {}

  @Get(':evento_id')
  async busca(
    @Param('evento_id') evento_id: number,
    @UsuarioAtual() usuario: Payload,
  ) {
    return await this.buscaReservaUsuarioUseCase.execute(evento_id, usuario);
  }
}
