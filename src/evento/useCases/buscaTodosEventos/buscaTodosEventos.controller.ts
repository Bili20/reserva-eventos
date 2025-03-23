import { Controller, Get, Query } from '@nestjs/common';
import { BuscaTodosEventosUseCase } from './buscaTodosEventos.use-case';
import { BuscaTodosEventosDto } from 'src/evento/models/dtos/buscaTodosEventos.dto';
import { IsPublic } from 'src/autenticacao/decorator/tornaRotaPublica.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Evento')
@IsPublic()
@Controller('evento')
export class BuscaTodosEventosController {
  constructor(
    private readonly buscaTodosEventosUseCase: BuscaTodosEventosUseCase,
  ) {}

  @ApiOperation({
    summary: 'Rota resposavel por buscar todos os eventos disponiveis.',
  })
  @Get('todos')
  async busca(@Query() param: BuscaTodosEventosDto) {
    return await this.buscaTodosEventosUseCase.execute(param);
  }
}
