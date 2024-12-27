import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusEnum } from '../enum/status.enum';
import { ReservaEntity } from 'src/reserva/models/entities/reserva.entity';

@Entity('pagamento')
export class PagamentoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ nullable: false })
  data_cricao: Date;

  @Column({ nullable: false, enum: StatusEnum })
  status: StatusEnum;

  @Column({ nullable: false })
  reserva_id: number;

  @ManyToOne(() => ReservaEntity, (reserva: ReservaEntity) => reserva.pagamento)
  @JoinColumn({ name: 'reserva_id' })
  reserva: ReservaEntity;
}
