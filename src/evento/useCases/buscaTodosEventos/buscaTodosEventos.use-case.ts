import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BuscaTodosEventosDto } from 'src/evento/models/dtos/buscaTodosEventos.dto';
import { IEventoRepo } from 'src/evento/models/interfaces/eventoRepo.interface';

@Injectable()
export class BuscaTodosEventosUseCase {
  constructor(
    @Inject('IEventoRepo')
    private readonly eventoRepo: IEventoRepo,
  ) {}

  async execute(param: BuscaTodosEventosDto) {
    try {
      return await this.eventoRepo.buscaTodosEventos(
        param.pagina,
        param.quantidade,
      );
    } catch (e) {
      throw new HttpException(
        e.respose ?? new InternalServerErrorException(e),
        e.status ?? 500,
      );
    }
  }
}
