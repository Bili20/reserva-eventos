import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SalvaImagemUseCase } from './salvaImagem.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { SalvaImagemDto } from 'src/evento/models/dtos/salvaImagem.dto';
import { UsuarioAtual } from 'src/autenticacao/decorator/usuarioAtual.decorator';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Evento')
@Controller('evento/imagem')
export class SalvaImagemController {
  @Inject(SalvaImagemUseCase)
  private readonly salvaImagemUseCase: SalvaImagemUseCase;

  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Rota resposanvel por enviar uma imagem para o evento.',
  })
  @UseInterceptors(FileInterceptor('imagem'))
  @Post()
  async salva(
    @UploadedFile() imagem: Express.Multer.File,
    @Body() param: SalvaImagemDto,
    @UsuarioAtual() usuario: Payload,
  ) {
    param.imagem = imagem;
    await this.salvaImagemUseCase.execute(param, usuario);
  }
}
