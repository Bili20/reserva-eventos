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
import { BuscaUmEventoUsuarioUseCase } from '../buscaUmEventoUsuario/buscaUmEventoUsuario.use-case';
import { DataSource } from 'typeorm';

@Injectable()
export class AtualizaEventoUseCase {
  constructor(
    @Inject('IEventoRepo')
    private readonly eventoRepo: IEventoRepo,
    private readonly buscaUmEventoUsuarioUseCase: BuscaUmEventoUsuarioUseCase,
    private readonly dataSource: DataSource,
  ) {}

  async execute(id: number, param: AtualizaEventoDto, usuario: Payload) {
    await this.dataSource.transaction(async (manager) => {
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
      newEvento.imagem = param.imagem;
      newEvento.capacidadeSobrando = param.capacidadeSobrando;
      try {
        await this.buscaUmEventoUsuarioUseCase.execute({
          id: id,
          usuario_id: usuario.sub,
        });
        if (param.data) {
          newEvento.validaData(param.data);
        }
        await this.eventoRepo.atualiza(id, newEvento, manager);
      } catch (e) {
        throw new HttpException(
          e.response ?? new InternalServerErrorException(e),
          e.status ?? 500,
        );
      }
    });
  }
}
