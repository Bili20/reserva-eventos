import internal from 'node:stream';

export interface IBucket {
  salvar(
    imagem: string,
    antigaImagem: string,
    imagemBuffer: Buffer,
  ): Promise<void>;
  buscaUmaImagem(imagem: string): Promise<string>;
}
