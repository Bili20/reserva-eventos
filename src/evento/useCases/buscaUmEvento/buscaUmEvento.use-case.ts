import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BucketFacade } from 'src/evento/bucket/bucket.facade';
import { IEventoRepo } from 'src/evento/models/interfaces/eventoRepo.interface';

@Injectable()
export class BuscaUmEventoUsecase {
  constructor(
    @Inject('IEventoRepo')
    private readonly eventoRepo: IEventoRepo,
    private readonly bucketFacade: BucketFacade,
  ) {}

  async execute(id: number) {
    const evento = await this.eventoRepo.buscaUm(id);
    const imagem = await this.bucketFacade.buscaUmaImagem(evento.imagem);

    if (!evento) {
      throw new NotFoundException({ message: 'Evento não encontrado.' });
    }
    return { evento, imagem };
  }
}
