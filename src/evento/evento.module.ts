import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntity } from './models/entities/evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventoEntity])],
})
export class EventoModule {}
