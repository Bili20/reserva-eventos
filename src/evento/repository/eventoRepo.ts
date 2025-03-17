import { InjectRepository } from '@nestjs/typeorm';
import { IEventoRepo } from '../models/interfaces/eventoRepo.interface';
import { Injectable } from '@nestjs/common';
import { EventoEntity } from '../models/entities/evento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventoRepo implements IEventoRepo {
  constructor(
    @InjectRepository(EventoEntity)
    private readonly eventoRepo: Repository<EventoEntity>,
  ) {}

  async criar(param: EventoEntity): Promise<void> {
    await this.eventoRepo.save(param);
  }

  async buscaUm(id: number): Promise<EventoEntity> {
    return await this.eventoRepo.findOne({ where: { id: id } });
  }

  async buscaEventoUsuario(usuario_id: number): Promise<EventoEntity[]> {
    return await this.eventoRepo.find({
      where: { usuario_id: usuario_id },
    });
  }

  async buscaUmEventoUsuario(
    usuario_id: number,
    id: number,
  ): Promise<EventoEntity> {
    return await this.eventoRepo.findOne({
      where: { usuario_id: usuario_id, id: id },
    });
  }

  async atualiza(id: number, param: EventoEntity): Promise<void> {
    await this.eventoRepo.update(id, param);
  }
}
