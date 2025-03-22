import { EntityManager } from 'typeorm';
import { ReservaEntity } from '../entities/reserva.entity';

export interface IReservaRepo {
  criar(param: ReservaEntity, manager: EntityManager): Promise<ReservaEntity>;
}
