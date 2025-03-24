import { Inject, Injectable } from '@nestjs/common';
import { DescontoCapacidadeDto } from 'src/evento/models/dtos/descontoCapacidade.dto';
import { IEventoRepo } from 'src/evento/models/interfaces/eventoRepo.interface';
import { EntityManager } from 'typeorm';
import { BuscaUmEventoUsecase } from '../buscaUmEvento/buscaUmEvento.use-case';

@Injectable()
export class DescontoCapacidade {
  constructor(
    @Inject('IEventoRepo')
    private readonly eventoRepo: IEventoRepo,
    private readonly buscaUmEvento: BuscaUmEventoUsecase,
  ) {}

  async execute(param: DescontoCapacidadeDto, manager: EntityManager) {
    const dadosEvento = await this.buscaUmEvento.execute(param.evento_id);
    dadosEvento.evento.validaDonoEvento(param.usuario.sub);
    dadosEvento.evento.validaCapacidade();
    dadosEvento.evento.descontoCapacidade(param.quantidade);

    await this.eventoRepo.atualiza(
      param.evento_id,
      dadosEvento.evento,
      manager,
    );
  }
}
