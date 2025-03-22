import { Body, Controller, Post } from '@nestjs/common';
import { CriaReservaUseCase } from './criaReserva.use-case';
import { CriaReservaDto } from 'src/reserva/models/dtos/criareserva.dto';
import { UsuarioAtual } from 'src/autenticacao/decorator/usuarioAtual.decorator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

@Controller('reserva')
export class CriaReservaController {
  constructor(private readonly criaReservaUseCase: CriaReservaUseCase) {}

  @Post()
  async criar(@Body() param: CriaReservaDto, @UsuarioAtual() usuario: Payload) {
    param.usuario = usuario;
    return await this.criaReservaUseCase.execute(param);
  }
}
