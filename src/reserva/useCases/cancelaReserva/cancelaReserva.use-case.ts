import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ManipulaCapacidadeEvento } from 'src/evento/useCases/descontoCapacidade/descontoCapacidade';
import { CancelaReservaDto } from 'src/reserva/models/dtos/cancelareserva.dto';
import { DataSource } from 'typeorm';
import { BuscaReservaUsuarioUseCase } from '../buscaReservaUsuario/buscaReservaUsuario.use-case';
import { DeletaReservaUseCase } from '../deletaReserva/deletareserva.use-case';
import { UpdateReservaUseCase } from '../updateReserva/updateReserva.use-case';

@Injectable()
export class CancelaReservaUseCase {
  constructor(
    private readonly updateReservaUseCase: UpdateReservaUseCase,
    private readonly manipulaCapacidadeEvento: ManipulaCapacidadeEvento,
    private readonly deletaReservaUseCase: DeletaReservaUseCase,
    private readonly buscaReservaUsuarioUseCase: BuscaReservaUsuarioUseCase,
    private dataSource: DataSource,
  ) {}

  async execute(param: CancelaReservaDto) {
    await this.dataSource.transaction(async (manager) => {
      try {
        const reserva = await this.buscaReservaUsuarioUseCase.execute(
          param.evento_id,
          param.usuario,
        );
        reserva.validaQuantidade(param.quantidade);

        await this.manipulaCapacidadeEvento.execute(
          {
            evento_id: param.evento_id,
            usuario: param.usuario,
            quantidade: -param.quantidade,
          },
          manager,
        );
        if (reserva.quantidade === param.quantidade) {
          await this.deletaReservaUseCase.execute(reserva.id, manager);
          return;
        }
        await this.updateReservaUseCase.execute(param, manager);
      } catch (e) {
        throw new HttpException(
          e.respose ?? new InternalServerErrorException(e.message),
          e.status ?? 500,
        );
      }
    });
  }
}
