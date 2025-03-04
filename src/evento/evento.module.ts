import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntity } from './models/entities/evento.entity';
import { CriaEventoUseCase } from './useCases/criaEvento/criaEvento.use-case';
import { EventoRepo } from './repository/eventoRepo';
import { CriaEventoController } from './useCases/criaEvento/criaEvento.controller';
import { SalvaImagemUseCase } from './useCases/salvaImagem/salvaImagem.use-case';
import { SalvaImagemController } from './useCases/salvaImagem/salvaImagem.controller';
import { BuscaUmEventoUsecase } from './useCases/buscaUmEvento/buscaUmEvento.use-case';
import { AtualizaEventoUseCase } from './useCases/atualizaEvento/atualizaEvento.use-case';
import { AtualizaEventoController } from './useCases/atualizaEvento/atualizaEvento.controller';
import { BuscaEventoUsuarioUseCase } from './useCases/buscaEventoUsuario/buscaEventoUsuario.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([EventoEntity])],
  providers: [
    EventoRepo,
    CriaEventoUseCase,
    SalvaImagemUseCase,
    BuscaUmEventoUsecase,
    AtualizaEventoUseCase,
    BuscaEventoUsuarioUseCase,
    { provide: 'IEventoRepo', useExisting: EventoRepo },
  ],
  controllers: [
    CriaEventoController,
    SalvaImagemController,
    AtualizaEventoController,
  ],
})
export class EventoModule {}
