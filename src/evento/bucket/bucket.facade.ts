import { IBucket } from '../models/interfaces/bucket.interface';
import { minioClient } from 'src/config/minioConfig';
import * as dotenv from 'dotenv';
dotenv.config();
export class BucketFacade implements IBucket {
  async salvar(
    imagem: string,
    antigaImagem: string,
    imagemBuffer: Buffer,
  ): Promise<void> {
    const existeBucket = await minioClient.bucketExists(
      process.env.MINIO_BUCKET_NAME,
    );

    if (!existeBucket) {
      await minioClient.makeBucket(process.env.MINIO_BUCKET_NAME);
    }
    if (antigaImagem) {
      await minioClient.removeObject(
        process.env.MINIO_BUCKET_NAME,
        antigaImagem,
      );
    }

    await minioClient.putObject(
      process.env.MINIO_BUCKET_NAME,
      imagem,
      imagemBuffer,
    );
  }

  async buscaUmaImagem(imagem: string): Promise<any> {
    if (imagem) {
      return await minioClient.getObject(process.env.MINIO_BUCKET_NAME, imagem);
    }
    return null;
  }
}
