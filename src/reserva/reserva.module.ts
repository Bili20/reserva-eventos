import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntity } from './models/entities/reserva.entity';
import { ReservaRepo } from './repository/reservaRepo';
import { CriaReservaUseCase } from './useCases/criaReserva/criaReserva.use-case';
import { CriaReservaController } from './useCases/criaReserva/criaReserva.controller';
import { EventoModule } from 'src/evento/evento.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaEntity]), EventoModule],
  providers: [
    ReservaRepo,
    CriaReservaUseCase,
    { provide: 'IReservaRepo', useExisting: ReservaRepo },
  ],
  controllers: [CriaReservaController],
})
export class ReservaModule {}
