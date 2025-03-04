import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';
import { AtualizaEventoDto } from 'src/evento/models/dtos/atualizaEvento.dto';
import { EventoEntity } from 'src/evento/models/entities/evento.entity';
import { IEventoRepo } from 'src/evento/models/interfaces/eventoRepo.interface';
import { BuscaUmEventoUsecase } from '../buscaUmEvento/buscaUmEvento.use-case';
import { BuscaEventoUsuarioUseCase } from '../buscaEventoUsuario/buscaEventoUsuario.use-case';

@Injectable()
export class AtualizaEventoUseCase {
  @Inject('IEventoRepo')
  private readonly eventoRepo: IEventoRepo;
  @Inject(BuscaEventoUsuarioUseCase)
  private readonly buscaEventoUsuarioUseCase: BuscaEventoUsuarioUseCase;

  async execute(id: number, param: AtualizaEventoDto, usuario: Payload) {
    const newEvento = new EventoEntity(
      param.titulo,
      param.descricao,
      param.data,
      param.horario,
      param.capacidade,
      param.localizacao,
      param.valor,
      usuario.sub,
    );
    try {
      await this.buscaEventoUsuarioUseCase.execute({
        id: id,
        usuario_id: usuario.sub,
      });
      if (param.data) {
        newEvento.validaData(param.data);
      }
      await this.eventoRepo.atualiza(id, newEvento);
    } catch (e) {
      throw new HttpException(
        e.response ?? new InternalServerErrorException(e),
        e.status ?? 500,
      );
    }
  }
}
