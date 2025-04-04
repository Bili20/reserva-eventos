import { Inject, Injectable } from '@nestjs/common';
import { IReservaRepo } from 'src/reserva/models/interfaces/reservaRepo.interface';
import { EntityManager } from 'typeorm';

@Injectable()
export class DeletaReservaUseCase {
  constructor(
    @Inject('IReservaRepo')
    private readonly reservaRepo: IReservaRepo,
  ) {}

  async execute(id: number, manager: EntityManager) {
    return await this.reservaRepo.deletaReserva(id, manager);
  }
}
