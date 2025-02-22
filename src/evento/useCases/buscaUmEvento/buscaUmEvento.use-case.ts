import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IEventoRepo } from 'src/evento/models/interfaces/eventoRepo.interface';
// TODO: depois preciso fazer a imagem aparecer no get junto
@Injectable()
export class BuscaUmEventoUsecase {
  @Inject('IEventoRepo')
  private readonly eventoRepo: IEventoRepo;

  async execute(id: number) {
    const evento = await this.eventoRepo.buscaUm(id);
    if (!evento) {
      throw new NotFoundException({ message: 'Evento não encontrado.' });
    }
    return evento;
  }
}
