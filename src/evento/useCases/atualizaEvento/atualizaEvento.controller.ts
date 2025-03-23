import { Payload } from 'src/autenticacao/models/dtos/payload.dto';
import { AtualizaEventoDto } from 'src/evento/models/dtos/atualizaEvento.dto';
import { AtualizaEventoUseCase } from './atualizaEvento.use-case';
import {
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsuarioAtual } from 'src/autenticacao/decorator/usuarioAtual.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Evento')
@Controller('evento')
export class AtualizaEventoController {
  constructor(private readonly atualizaEventoUseCase: AtualizaEventoUseCase) {}

  @ApiOperation({
    summary: 'Rota responsavel por atualizar os dados do evento.',
  })
  @Patch(':id')
  async atualiza(
    @Param('id') id: number,
    @Body() param: AtualizaEventoDto,
    @UsuarioAtual() usuario: Payload,
  ) {
    try {
      await this.atualizaEventoUseCase.execute(id, param, usuario);
    } catch (e) {
      throw new HttpException(
        e.response ?? new InternalServerErrorException(e),
        e.status ?? 500,
      );
    }
  }
}
