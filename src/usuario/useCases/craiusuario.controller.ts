import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CriaUsuarioUseCase } from './criaUsuario.use-case';
import { CriaUsuarioDto } from '../models/dtos/criaUsuario.dto';

@Controller('usuario')
export class CriaUsuarioController {
  @Inject(CriaUsuarioUseCase)
  private readonly criaUsuarioUseCase: CriaUsuarioUseCase;

  @Post()
  async criar(@Body() param: CriaUsuarioDto) {
    await this.criaUsuarioUseCase.execute(param);
  }
}
