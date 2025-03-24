import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DescontoCapacidade } from 'src/evento/useCases/descontoCapacidade/descontoCapacidade';
import { CriaReservaDto } from 'src/reserva/models/dtos/criareserva.dto';
import { ReservaEntity } from 'src/reserva/models/entities/reserva.entity';
import { IReservaRepo } from 'src/reserva/models/interfaces/reservaRepo.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class CriaReservaUseCase {
  constructor(
    @Inject('IReservaRepo') private readonly reservaRepo: IReservaRepo,
    private readonly descontoCapacidade: DescontoCapacidade,
    private dataSource: DataSource,
  ) {}

  async execute(param: CriaReservaDto) {
    await this.dataSource.transaction(async (manager) => {
      try {
        await this.descontoCapacidade.execute(
          {
            evento_id: param.evento_id,
            usuario: param.usuario,
            quantidade: param.quantidade,
          },
          manager,
        );
        const reserva = new ReservaEntity();
        reserva.evento_id = param.evento_id;
        reserva.usuario_id = param.usuario.sub;
        reserva.quantidade = param.quantidade;
        await this.reservaRepo.criar(reserva, manager);
      } catch (e) {
        throw new HttpException(
          e.respose ?? new InternalServerErrorException(e),
          e.status ?? 500,
        );
      }
    });
  }
}
