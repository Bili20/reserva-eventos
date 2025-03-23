import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CriaUsuarioUseCase } from './criaUsuario.use-case';
import { CriaUsuarioDto } from 'src/usuario/models/dtos/criaUsuario.dto';
import { IsPublic } from 'src/autenticacao/decorator/tornaRotaPublica.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Usuario')
@IsPublic()
@Controller('usuario')
export class CriaUsuarioController {
  @Inject(CriaUsuarioUseCase)
  private readonly criaUsuarioUseCase: CriaUsuarioUseCase;

  @ApiOperation({ summary: 'Rota resposanvel por criar um usuario.' })
  @Post()
  async criar(@Body() param: CriaUsuarioDto) {
    await this.criaUsuarioUseCase.execute(param);
  }
}
