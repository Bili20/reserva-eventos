import { EventoEntity } from 'src/evento/models/entities/evento.entity';
import { PagamentoEntity } from 'src/pagamento/models/entities/pagamento.entity';
import { UsuarioEntity } from 'src/usuario/models/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reserva')
export class ReservaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ nullable: false })
  data_criacao: Date;

  @Column({ nullable: false })
  usuario_id: number;

  @Column({ nullable: false })
  evento_id: number;

  @ManyToOne(() => UsuarioEntity, (usuario: UsuarioEntity) => usuario.reserva)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntity;

  @ManyToOne(() => EventoEntity, (evento: EventoEntity) => evento.reserva)
  @JoinColumn({ name: 'evento_id' })
  evento: EventoEntity;

  @OneToMany(
    () => PagamentoEntity,
    (pagamento: PagamentoEntity) => pagamento.reserva,
  )
  pagamento: PagamentoEntity;
}
