import { EntityManager } from 'typeorm';
import { ReservaEntity } from '../entities/reserva.entity';

export interface IReservaRepo {
  criar(param: ReservaEntity, manager: EntityManager): Promise<ReservaEntity>;
  update(param: ReservaEntity, manager: EntityManager): Promise<void>;
  buscaReservaUsuario(
    evento_id: number,
    usuario_id: number,
  ): Promise<ReservaEntity>;
  deletaReserva(id: number, manager: EntityManager): Promise<void>;
}
