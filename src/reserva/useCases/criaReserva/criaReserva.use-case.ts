import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ManipulaCapacidadeEvento } from 'src/evento/useCases/descontoCapacidade/descontoCapacidade';
import { CriaReservaDto } from 'src/reserva/models/dtos/criareserva.dto';
import { ReservaEntity } from 'src/reserva/models/entities/reserva.entity';
import { IReservaRepo } from 'src/reserva/models/interfaces/reservaRepo.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class CriaReservaUseCase {
  constructor(
    @Inject('IReservaRepo') private readonly reservaRepo: IReservaRepo,
    private readonly descontoCapacidade: ManipulaCapacidadeEvento,
    private dataSource: DataSource,
  ) {}

  async execute(param: CriaReservaDto) {
    let reserva: ReservaEntity;
    await this.dataSource.transaction(async (manager) => {
      try {
        const reservaExistente = await this.reservaRepo.buscaReservaUsuario(
          param.evento_id,
          param.usuario.sub,
        );
        if (reservaExistente) {
          reserva = reservaExistente;
          reserva.quantidade += param.quantidade;
        } else {
          reserva = new ReservaEntity();
          reserva.quantidade = param.quantidade;
        }

        reserva.evento_id = param.evento_id;
        reserva.usuario_id = param.usuario.sub;
        await this.reservaRepo.criar(reserva, manager);

        await this.descontoCapacidade.execute(
          {
            evento_id: param.evento_id,
            usuario: param.usuario,
            quantidade: param.quantidade,
          },
          manager,
        );
      } catch (e) {
        throw new HttpException(
          e.respose ?? new InternalServerErrorException(e.message),
          e.status ?? 500,
        );
      }
    });
  }
}
