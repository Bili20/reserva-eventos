import { BadRequestException } from '@nestjs/common';
import { EventoEntity } from 'src/evento/models/entities/evento.entity';
import { UsuarioEntity } from 'src/usuario/models/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column({ nullable: false })
  quantidade: number;

  @ManyToOne(() => UsuarioEntity, (usuario: UsuarioEntity) => usuario.reserva)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntity;

  @ManyToOne(() => EventoEntity, (evento: EventoEntity) => evento.reserva)
  @JoinColumn({ name: 'evento_id' })
  evento: EventoEntity;

  validaQuantidade(quantiade: number) {
    if (quantiade > this.quantidade || quantiade <= 0) {
      throw new BadRequestException('Informe uma quantidade valida.');
    }
  }
}
