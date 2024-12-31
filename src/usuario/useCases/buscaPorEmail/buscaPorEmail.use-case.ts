import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUsuarioRepo } from 'src/usuario/models/interfaces/usuarioRepo.interface';

@Injectable()
export class BuscaPorEmailUseCase {
  @Inject('IUsuarioRepo') private readonly usuarioRepo: IUsuarioRepo;

  async execute(param: string) {
    if (!param) {
      throw new BadRequestException({ message: 'Informe um email.' });
    }
    return await this.usuarioRepo.buscaPorEmail(param);
  }
}
