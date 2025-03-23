import { Controller, Get, Param } from '@nestjs/common';
import { BuscaUmEventoUsecase } from './buscaUmEvento.use-case';
import { IsPublic } from 'src/autenticacao/decorator/tornaRotaPublica.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Evento')
@IsPublic()
@Controller('evento')
export class BuscaUmEventoController {
  constructor(private readonly buscaUmEventoUsecase: BuscaUmEventoUsecase) {}

  @ApiOperation({ summary: 'Rota responsavel por trazer um unico evento.' })
  @Get(':id')
  async buscaUm(@Param('id') id: number) {
    return await this.buscaUmEventoUsecase.execute(id);
  }
}
