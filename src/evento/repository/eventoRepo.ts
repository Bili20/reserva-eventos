import { InjectRepository } from '@nestjs/typeorm';
import { IEventoRepo } from '../models/interfaces/eventoRepo.interface';
import { Inject, Injectable } from '@nestjs/common';
import { EventoEntity } from '../models/entities/evento.entity';
import { EntityManager, Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class EventoRepo implements IEventoRepo {
  constructor(
    @InjectRepository(EventoEntity)
    private readonly eventoRepo: Repository<EventoEntity>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async criar(param: EventoEntity): Promise<void> {
    await this.cacheService.del('eventos_1_10');
    await this.eventoRepo.save(param);
  }

  async buscaUm(id: number): Promise<EventoEntity> {
    return await this.eventoRepo.findOne({ where: { id: id } });
  }

  async buscaEventosDoUsuario(usuario_id: number): Promise<EventoEntity[]> {
    return await this.eventoRepo.find({
      where: { usuario_id: usuario_id },
    });
  }

  async buscaTodosEventos(
    pagina: number,
    quantidade: number,
  ): Promise<EventoEntity[]> {
    const cacheEventos = await this.cacheService.get<EventoEntity[]>(
      `eventos_${pagina}_${quantidade}`,
    );

    if (cacheEventos) {
      return cacheEventos;
    }
    const dadosEventos = await this.eventoRepo
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
      .orderBy('evento.id', 'DESC')
      .getRawMany();

    if (dadosEventos.length) {
      await this.cacheService.set(
        `eventos_${pagina}_${quantidade}`,
        dadosEventos,
      );
    }

    return dadosEventos;
  }

  async buscaUmEventoUsuario(
    usuario_id: number,
    id: number,
  ): Promise<EventoEntity> {
    return await this.eventoRepo.findOne({
      where: { usuario_id: usuario_id, id: id },
    });
  }

  async atualiza(
    id: number,
    param: EventoEntity,
    manager: EntityManager,
  ): Promise<void> {
    await this.cacheService.reset();
    await manager.update(EventoEntity, id, param);
  }
}
