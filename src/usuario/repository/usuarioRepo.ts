import { Injectable } from '@nestjs/common';
import { IUsuarioRepo } from '../models/interfaces/usuarioRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../models/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRepo implements IUsuarioRepo {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepo: Repository<UsuarioEntity>,
  ) {}

  async criar(param: UsuarioEntity): Promise<void> {
    await this.usuarioRepo.save(param);
  }
}
