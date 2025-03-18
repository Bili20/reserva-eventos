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

  async buscaEventosUsuario(usuario_id: number): Promise<EventoEntity[]> {
    return await this.eventoRepo.find({
      where: { usuario_id: usuario_id },
    });
  }

  async buscaTodosEventos(
    pagina: number,
    quantidade: number,
  ): Promise<EventoEntity[]> {
    return await this.eventoRepo
      .createQueryBuilder('evento')
      .select([
        'evento.id as id',
        'evento.titulo as titulo',
        'evento.data as data',
        'evento.horario as horario',
        'evento.capacidade as capacidade',
        'evento.valor as valor',
        'evento.capacidadeSobrando as capacidade_sobrando',
      ])
      .addSelect(`COUNT(*) OVER()`, 'total')
      .where('evento.capacidadeSobrando > 0 AND evento.data >= NOW()')
      .limit(quantidade)
      .offset((pagina - 1) * quantidade)
      .getRawMany();
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
