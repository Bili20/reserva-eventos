import { Inject, Injectable } from '@nestjs/common';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';
import { IReservaRepo } from 'src/reserva/models/interfaces/reservaRepo.interface';

@Injectable()
export class BuscaReservaUsuarioUseCase {
  constructor(
    @Inject('IReservaRepo')
    private readonly reservaRepo: IReservaRepo,
  ) {}

  async execute(evento_id: number, usuario: Payload) {
    const reserva = await this.reservaRepo.buscaReservaUsuario(
      evento_id,
      usuario.sub,
    );
    if (!reserva) {
      throw new Error('Reserva não encontrada');
    }
    return reserva;
  }
}
