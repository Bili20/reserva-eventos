import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntity } from './models/entities/evento.entity';
import { CriaEventoUseCase } from './useCases/criaEvento/criaEvento.use-case';
import { EventoRepo } from './repository/eventoRepo';
import { CriaEventoController } from './useCases/criaEvento/criaEvento.controller';
import { SalvaImagemUseCase } from './useCases/salvaImagem/salvaImagem.use-case';
import { SalvaImagemController } from './useCases/salvaImagem/salvaImagem.controller';
import { BuscaUmEventoUsecase } from './useCases/buscaUmEvento/buscaUmEvento.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([EventoEntity])],
  providers: [
    EventoRepo,
    CriaEventoUseCase,
    SalvaImagemUseCase,
    BuscaUmEventoUsecase,
    { provide: 'IEventoRepo', useExisting: EventoRepo },
  ],
  controllers: [CriaEventoController, SalvaImagemController],
})
export class EventoModule {}
