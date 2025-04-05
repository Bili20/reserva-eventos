import { EntityManager } from 'typeorm';
import { EventoEntity } from '../entities/evento.entity';

export interface IEventoRepo {
  criar(param: EventoEntity): Promise<void>;
  buscaUm(id: number): Promise<EventoEntity>;
  buscaEventosDoUsuario(usuario_id: number): Promise<EventoEntity[]>;
  buscaTodosEventos(
    pagina: number,
    quantidade: number,
  ): Promise<EventoEntity[]>;
  buscaUmEventoUsuario(usuario_id: number, id: number): Promise<EventoEntity>;
  atualiza(
    id: number,
    param: EventoEntity,
    manager: EntityManager,
  ): Promise<void>;
}
