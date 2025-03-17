import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';
import { SalvaImagemDto } from 'src/evento/models/dtos/salvaImagem.dto';
import { AtualizaEventoUseCase } from '../atualizaEvento/atualizaEvento.use-case';
import { BucketFacade } from 'src/evento/bucket/bucket.facade';
import { BuscaUmEventoUsuarioUseCase } from '../buscaUmEventoUsuario/buscaUmEventoUsuario.use-case';
@Injectable()
export class SalvaImagemUseCase {
  constructor(
    private readonly buscaUmEventoUsuarioUseCase: BuscaUmEventoUsuarioUseCase,
    private readonly atualizaEventoUseCase: AtualizaEventoUseCase,
    private readonly bucketFacade: BucketFacade,
  ) {}

  async execute(param: SalvaImagemDto, usuario: Payload) {
    try {
      const evento = await this.buscaUmEventoUsuarioUseCase.execute({
        id: param.evento_id,
        usuario_id: usuario.sub,
      });
      let antigoNomeImagem = evento.imagem;
      const novoNomeImagem = evento.renomearImagem(param.imagem.originalname);

      await this.bucketFacade.salvar(
        novoNomeImagem,
        antigoNomeImagem,
        param.imagem.buffer,
      );
      await this.atualizaEventoUseCase.execute(
        param.evento_id,
        { imagem: novoNomeImagem },
        usuario,
      );
    } catch (e) {
      throw new HttpException(
        e.response ?? new InternalServerErrorException(e),
        e.status ?? 500,
      );
    }
  }
}
