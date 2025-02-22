import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AutenticacaoDto } from '../../models/dtos/login.dto';
import { LoginUseCase } from './login.use-case';
import { IsPublic } from 'src/autenticacao/decorator/tornaRotaPublica.decorator';
@IsPublic()
@Controller('login')
export class LoginController {
  @Inject(LoginUseCase)
  private readonly LoginUseCase: LoginUseCase;

  @Post()
  async login(@Body() param: AutenticacaoDto) {
    return await this.LoginUseCase.execute(param);
  }
}
