import { ReservaEntity } from 'src/reserva/models/entities/reserva.entity';
import { UsuarioEntity } from 'src/usuario/models/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('evento')
export class EventoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  titulo: string;

  @Column({ nullable: false })
  descricao: string;

  @Column({ nullable: false })
  data: Date;

  @Column({ nullable: false })
  horario: string;

  @Column({ nullable: false })
  capacidade: number;

  @Column({ nullable: true })
  imagem: string;

  @Column({ nullable: false })
  localizacao: string;

  @Column({ nullable: false })
  usuario_id: number;

  @ManyToOne(() => UsuarioEntity, (usuario: UsuarioEntity) => usuario.evento)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntity;

  @OneToMany(() => ReservaEntity, (reserva: ReservaEntity) => reserva.evento)
  reserva: ReservaEntity;
}
