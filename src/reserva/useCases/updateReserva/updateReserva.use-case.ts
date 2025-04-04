import { Inject, Injectable } from '@nestjs/common';
import { UpdatereservaDto } from 'src/reserva/models/dtos/updatereserva.dto';
import { ReservaEntity } from 'src/reserva/models/entities/reserva.entity';
import { IReservaRepo } from 'src/reserva/models/interfaces/reservaRepo.interface';
import { EntityManager } from 'typeorm';

@Injectable()
export class UpdateReservaUseCase {
  constructor(
    @Inject('IReservaRepo')
    private readonly reservaRepo: IReservaRepo,
  ) {}

  async execute(param: UpdatereservaDto, manager: EntityManager) {
    const reserva = new ReservaEntity();
    reserva.evento_id = param.evento_id;
    reserva.usuario_id = param.usuario.sub;
    reserva.quantidade = param.quantidade;
    return await this.reservaRepo.update(reserva, manager);
  }
}
