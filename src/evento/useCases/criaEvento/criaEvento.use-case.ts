import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';
import { CriaEventoDto } from 'src/evento/models/dtos/criaEvento.dto';
import { EventoEntity } from 'src/evento/models/entities/evento.entity';
import { IEventoRepo } from 'src/evento/models/interfaces/eventoRepo.interface';

@Injectable()
export class CriaEventoUseCase {
  @Inject('IEventoRepo')
  private readonly eventoRepo: IEventoRepo;

  async execute(param: CriaEventoDto, usuario: Payload) {
    try {
      const evento = new EventoEntity(
        param.titulo,
        param.descricao,
        param.data,
        param.horario,
        param.capacidade,
        param.localizacao,
        param.valor,
        usuario.sub,
      );
      evento.capacidadeSobrando = param.capacidade;

      evento.validaData(param.data);

      await this.eventoRepo.criar(evento);
    } catch (e) {
      throw new HttpException(
        e.response ?? new InternalServerErrorException(e),
        e.status ?? 500,
      );
    }
  }
}
