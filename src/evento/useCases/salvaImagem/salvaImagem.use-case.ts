import {
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { minioClient } from 'src/config/minioConfig';
import { IEventoRepo } from 'src/evento/models/interfaces/eventoRepo.interface';
import { BuscaUmEventoUsecase } from '../buscaUmEvento/buscaUmEvento.use-case';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';
import { SalvaImagemDto } from 'src/evento/models/dtos/salvaImagem.dto';
// Identificar se o evento é da pessoa para salvar a imagem
@Injectable()
export class SalvaImagemUseCase {
  @Inject(BuscaUmEventoUsecase)
  private readonly buscaUmEventoUsecase: BuscaUmEventoUsecase;

  async execute(param: SalvaImagemDto, usuario: Payload) {
    const imagemNomeOriginal = param.imagem.originalname + new Date().getTime();
    try {
      const evento = await this.buscaUmEventoUsecase.execute(param.evento_id);
      if (evento.usuario_id != usuario.sub) {
        throw new ForbiddenException({
          message: 'Sem permissão para adicionar imagem.',
        });
      }
      const existeBucket = await minioClient.bucketExists(
        process.env.MINIO_BUCKET_NAME,
      );

      if (!existeBucket) {
        await minioClient.makeBucket(process.env.MINIO_BUCKET_NAME);
      }

      await minioClient.putObject(
        process.env.MINIO_BUCKET_NAME,
        imagemNomeOriginal,
        param.imagem.buffer,
      );
    } catch (e) {
      throw new HttpException(
        e.response ?? new InternalServerErrorException(),
        e.status ?? 500,
      );
    }
  }
}
