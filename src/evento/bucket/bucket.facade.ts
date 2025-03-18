import { IBucket } from '../models/interfaces/bucket.interface';
import { minioClient } from 'src/config/minioConfig';
import * as dotenv from 'dotenv';
import internal from 'node:stream';
import { BadRequestException } from '@nestjs/common';
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

  async buscaUmaImagem(imagem: string): Promise<string> {
    if (imagem) {
      const imagemStream = await minioClient.getObject(
        process.env.MINIO_BUCKET_NAME,
        imagem,
      );

      const imagemBuffer = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        imagemStream.on('data', (chunk) => chunks.push(chunk));
        imagemStream.on('error', reject);
        imagemStream.on('end', () => resolve(Buffer.concat(chunks)));
      });

      return `data:image/*;base64,${imagemBuffer.toString('base64')}`;
    }
    return null;
  }
}
