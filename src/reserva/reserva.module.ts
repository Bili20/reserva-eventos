import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntity } from './models/entities/reserva.entity';
import { ReservaRepo } from './repository/reservaRepo';
import { CriaReservaUseCase } from './useCases/criaReserva/criaReserva.use-case';
import { CriaReservaController } from './useCases/criaReserva/criaReserva.controller';
import { EventoModule } from 'src/evento/evento.module';
import { BuscaReservaUsuarioUseCase } from './useCases/buscaReservaUsuario/buscaReservaUsuario.use-case';
import { BuscaReservaUsuarioController } from './useCases/buscaReservaUsuario/buscaReservausuario.controller';
import { CancelaReservaController } from './useCases/cancelaReserva/cancelaReserva.controller';
import { CancelaReservaUseCase } from './useCases/cancelaReserva/cancelaReserva.use-case';
import { DeletaReservaUseCase } from './useCases/deletaReserva/deletareserva.use-case';
import { UpdateReservaUseCase } from './useCases/updateReserva/updateReserva.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaEntity]), EventoModule],
  providers: [
    ReservaRepo,
    CriaReservaUseCase,
    BuscaReservaUsuarioUseCase,
    CancelaReservaUseCase,
    DeletaReservaUseCase,
    UpdateReservaUseCase,
    { provide: 'IReservaRepo', useExisting: ReservaRepo },
  ],
  controllers: [
    CriaReservaController,
    BuscaReservaUsuarioController,
    CancelaReservaController,
  ],
})
export class ReservaModule {}
