import { BadRequestException } from '@nestjs/common';
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
  constructor(
    titulo: string,
    descricao: string,
    data: Date,
    horario: string,
    capacidade: number,
    localizacao: string,
    valor: number,
    usuario_id: number,
    capacidadeSobrando?: number,
    imagem?: string,
  ) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.data = data;
    this.horario = horario;
    this.capacidade = capacidade;
    this.imagem = imagem;
    this.localizacao = localizacao;
    this.valor = valor;
    this.usuario_id = usuario_id;
    this.capacidadeSobrando = capacidadeSobrando;
  }

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

  @Column({ nullable: false })
  capacidadeSobrando: number;

  @Column({ nullable: true })
  imagem: string;

  @Column({ nullable: false })
  localizacao: string;

  @Column('decimal', { nullable: false, precision: 10, scale: 2 })
  valor: number;

  @Column({ nullable: false })
  usuario_id: number;

  @ManyToOne(() => UsuarioEntity, (usuario: UsuarioEntity) => usuario.evento)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntity;

  @OneToMany(() => ReservaEntity, (reserva: ReservaEntity) => reserva.evento)
  reserva: ReservaEntity;

  validaData(data: Date) {
    if (data < new Date()) {
      throw new BadRequestException({
        message: 'A data do evento deve ser maior ou igual a data de hoje.',
      });
    }
  }
}
