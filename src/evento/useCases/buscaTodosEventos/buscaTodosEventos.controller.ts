import { Controller, Get, Query } from '@nestjs/common';
import { BuscaTodosEventosUseCase } from './buscaTodosEventos.use-case';
import { BuscaTodosEventosDto } from 'src/evento/models/dtos/buscaTodosEventos.dto';
import { IsPublic } from 'src/autenticacao/decorator/tornaRotaPublica.decorator';
@IsPublic()
@Controller('evento')
export class BuscaTodosEventosController {
  constructor(
    private readonly buscaTodosEventosUseCase: BuscaTodosEventosUseCase,
  ) {}

  @Get('todos')
  async busca(@Query() param: BuscaTodosEventosDto) {
    return await this.buscaTodosEventosUseCase.execute(param);
  }
}
