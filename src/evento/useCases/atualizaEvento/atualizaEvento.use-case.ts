import { Inject, Injectable } from '@nestjs/common';
import { IEventoRepo } from 'src/evento/models/interfaces/eventoRepo.interface';

@Injectable()
export class AtualizaEventoUseCase {
  @Inject('IEventoRepo')
  private readonly eventoRepo: IEventoRepo;
}
