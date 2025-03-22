import { Inject, Injectable } from '@nestjs/common';
import { BuscaUmEventoUsecase } from 'src/evento/useCases/buscaUmEvento/buscaUmEvento.use-case';
import { CriaReservaDto } from 'src/reserva/models/dtos/criareserva.dto';
import { ReservaEntity } from 'src/reserva/models/entities/reserva.entity';
import { IReservaRepo } from 'src/reserva/models/interfaces/reservaRepo.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class CriaReservaUseCase {
  constructor(
    @Inject('IReservaRepo') private readonly reservaRepo: IReservaRepo,
    private readonly buscaUmEvento: BuscaUmEventoUsecase,
    private dataSource: DataSource,
  ) {}

  async execute(param: CriaReservaDto) {
    await this.dataSource.transaction(async (manager) => {
      const dadosEvento = await this.buscaUmEvento.execute(param.evento_id);
      dadosEvento.evento.validaDonoEvento(param.usuario.sub);
      dadosEvento.evento.validaCapacidade();

      const reserva = new ReservaEntity();
      reserva.evento_id = param.evento_id;
      reserva.usuario_id = param.usuario.sub;
      param.valor = dadosEvento.evento.valor;
      await this.reservaRepo.criar(reserva, manager);

      //aqui vai a logica de pagamento
      //aqui vai a logica de desconto da capacidade
    });
  }
}
