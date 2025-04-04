import { Body, Controller, Post } from '@nestjs/common';
import { CancelaReservaDto } from 'src/reserva/models/dtos/cancelareserva.dto';
import { CancelaReservaUseCase } from './cancelaReserva.use-case';
import { UsuarioAtual } from 'src/autenticacao/decorator/usuarioAtual.decorator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

@Controller('reserva')
export class CancelaReservaController {
  constructor(private readonly cancelaReservaUseCase: CancelaReservaUseCase) {}

  @Post('cancelaReserva')
  async cancelaReserva(
    @Body() param: CancelaReservaDto,
    @UsuarioAtual() usuario: Payload,
  ) {
    param.usuario = usuario;
    return await this.cancelaReservaUseCase.execute(param);
  }
}
