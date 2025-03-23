import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AutenticacaoDto } from '../../models/dtos/login.dto';
import { LoginUseCase } from './login.use-case';
import { IsPublic } from 'src/autenticacao/decorator/tornaRotaPublica.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Autenticação')
@IsPublic()
@Controller('login')
export class LoginController {
  @Inject(LoginUseCase)
  private readonly LoginUseCase: LoginUseCase;

  @ApiOperation({ summary: 'Rota responsavel por logar o usuario.' })
  @Post()
  async login(@Body() param: AutenticacaoDto) {
    return await this.LoginUseCase.execute(param);
  }
}
