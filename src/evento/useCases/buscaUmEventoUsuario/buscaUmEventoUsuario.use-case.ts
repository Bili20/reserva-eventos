import { BadRequestException, Inject } from '@nestjs/common';
import { BuscaUmEventoUsuarioDto } from 'src/evento/models/dtos/buscaUmEventoUsuraio.dto';
import { IEventoRepo } from 'src/evento/models/interfaces/eventoRepo.interface';

export class BuscaUmEventoUsuarioUseCase {
  @Inject('IEventoRepo')
  private readonly eventoRepo: IEventoRepo;

  async execute(param: BuscaUmEventoUsuarioDto) {
    const evento = await this.eventoRepo.buscaUmEventoUsuario(
      param.usuario_id,
      param.id,
    );
    if (!evento) {
      throw new BadRequestException({ message: 'Evento não encontrado.' });
    }
    return evento;
  }
}
