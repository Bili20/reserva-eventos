import { Controller, Get, Param } from '@nestjs/common';
import { BuscaUmEventoUsecase } from './buscaUmEvento.use-case';
import { IsPublic } from 'src/autenticacao/decorator/tornaRotaPublica.decorator';
@IsPublic()
@Controller('evento')
export class BuscaUmEventoController {
  constructor(private readonly buscaUmEventoUsecase: BuscaUmEventoUsecase) {}

  @Get(':id')
  async buscaUm(@Param('id') id: number) {
    return await this.buscaUmEventoUsecase.execute(id);
  }
}
