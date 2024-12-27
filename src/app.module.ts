import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeormConfig';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';
import { EventoModule } from './evento/evento.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ReservaModule } from './reserva/reserva.module';
import { PagamentoModule } from './pagamento/pagamento.module';
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
  ],
})
export class AppModule {}
