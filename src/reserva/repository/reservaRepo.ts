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
}
