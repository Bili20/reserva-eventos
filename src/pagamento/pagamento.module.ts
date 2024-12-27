import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoEntity } from './models/entities/pagamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagamentoEntity])],
})
export class PagamentoModule {}
