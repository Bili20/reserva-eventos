import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaEntity } from '../models/entities/reserva.entity';
import { EntityManager, Repository } from 'typeorm';
import { IReservaRepo } from '../models/interfaces/reservaRepo.interface';

@Injectable()
export class ReservaRepo implements IReservaRepo {
  constructor(
    @InjectRepository(ReservaEntity)
    private readonly reservaRepo: Repository<ReservaEntity>,
  ) {}

  async criar(
    param: ReservaEntity,
    manager: EntityManager,
  ): Promise<ReservaEntity> {
    return await manager.save(param);
  }

  async update(param: ReservaEntity, manager: EntityManager): Promise<void> {
    await manager.update(ReservaEntity, param.id, {
      quantidade: param.quantidade,
    });
  }

  async buscaReservaUsuario(
    evento_id: number,
    usuario_id: number,
  ): Promise<ReservaEntity> {
    return await this.reservaRepo.findOne({
      where: { evento_id: evento_id, usuario_id: usuario_id },
    });
  }

  async deletaReserva(id: number, manager: EntityManager): Promise<void> {
    await manager.delete(ReservaEntity, id);
  }
}
