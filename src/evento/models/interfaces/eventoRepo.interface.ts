import { EventoEntity } from '../entities/evento.entity';

export interface IEventoRepo {
  criar(param: EventoEntity): Promise<void>;
  buscaUm(id: number): Promise<EventoEntity>;
  buscaEventoUsuario(usuario_id: number): Promise<EventoEntity[]>;
  buscaUmEventoUsuario(usuario_id: number, id: number): Promise<EventoEntity>;
  atualiza(id: number, param: EventoEntity): Promise<void>;
}
