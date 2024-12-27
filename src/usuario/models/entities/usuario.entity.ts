import { EventoEntity } from 'src/evento/models/entities/evento.entity';
import { ReservaEntity } from 'src/reserva/models/entities/reserva.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();
@Entity('usuario')
export class UsuarioEntity {
  constructor(nome: string, email: string, senha: string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  senha: string;

  @OneToMany(() => EventoEntity, (evento: EventoEntity) => evento.usuario)
  evento: EventoEntity;

  @OneToMany(() => ReservaEntity, (reserva: ReservaEntity) => reserva.usuario)
  reserva: ReservaEntity;

  encriptaSenha(param: string) {
    this.senha = bcrypt.hashSync(param, Number(process.env.SALT));
  }
}
