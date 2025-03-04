import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BuscaEventoUsuarioDto } from 'src/evento/models/dtos/buscaEventoUsuario.dto';
import { IEventoRepo } from 'src/evento/models/interfaces/eventoRepo.interface';

@Injectable()
export class BuscaEventoUsuarioUseCase {
  @Inject('IEventoRepo')
  private readonly eventoRepo: IEventoRepo;

  async execute(param: BuscaEventoUsuarioDto) {
    const eventos = await this.eventoRepo.buscaEventoUsuario(
      param.usuario_id,
      param.id,
    );
    if (eventos.length == 0) {
      throw new BadRequestException({ message: 'Nenhum evento encontrado.' });
    }
    return eventos;
  }
}
