import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntity } from './models/entities/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaEntity])],
})
export class ReservaModule {}
