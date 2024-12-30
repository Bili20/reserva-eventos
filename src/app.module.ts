import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { typeOrmConfig } from './config/typeormConfig';
import { EventoModule } from './evento/evento.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { ReservaModule } from './reserva/reserva.module';
import { UsuarioModule } from './usuario/usuario.module';
import { APP_GUARD } from '@nestjs/core';
import { ValidaJwtGuard } from './autenticacao/guards/validaJwt.guard';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 60000,
    }),
    EventoModule,
    UsuarioModule,
    ReservaModule,
    PagamentoModule,
    AutenticacaoModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ValidaJwtGuard,
    },
  ],
})
export class AppModule {}
