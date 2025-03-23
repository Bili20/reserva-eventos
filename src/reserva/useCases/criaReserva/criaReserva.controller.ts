import { Body, Controller, Post } from '@nestjs/common';
import { CriaReservaUseCase } from './criaReserva.use-case';
import { CriaReservaDto } from 'src/reserva/models/dtos/criareserva.dto';
import { UsuarioAtual } from 'src/autenticacao/decorator/usuarioAtual.decorator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Reserva')
@Controller('reserva')
export class CriaReservaController {
  constructor(private readonly criaReservaUseCase: CriaReservaUseCase) {}

  @ApiOperation({
    summary: 'Rota resposanvel por fazer uma reserva no evento.',
  })
  @Post()
  async criar(@Body() param: CriaReservaDto, @UsuarioAtual() usuario: Payload) {
    param.usuario = usuario;
    return await this.criaReservaUseCase.execute(param);
  }
}
