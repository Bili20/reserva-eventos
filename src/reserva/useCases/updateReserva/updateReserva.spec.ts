import { Test, TestingModule } from '@nestjs/testing';
import { UpdateReservaUseCase } from './updateReserva.use-case';
import { IReservaRepo } from 'src/reserva/models/interfaces/reservaRepo.interface';
import { DeletaReservaUseCase } from '../deletaReserva/deletareserva.use-case';
import { BuscaReservaUsuarioUseCase } from '../buscaReservaUsuario/buscaReservaUsuario.use-case';
import { EntityManager } from 'typeorm';
import { UpdatereservaDto } from 'src/reserva/models/dtos/updatereserva.dto';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

describe('UpdateReservaUseCase', () => {
  let updateReservaUseCase: UpdateReservaUseCase;
  let reservaRepo: jest.Mocked<IReservaRepo>;
  let deletaReservaUseCase: jest.Mocked<DeletaReservaUseCase>;
  let buscaReservaUsuarioUseCase: jest.Mocked<BuscaReservaUsuarioUseCase>;
  let manager: jest.Mocked<EntityManager>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateReservaUseCase,
        {
          provide: 'IReservaRepo',
          useValue: {
            update: jest.fn(),
          },
        },
        {
          provide: DeletaReservaUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: BuscaReservaUsuarioUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    updateReservaUseCase =
      module.get<UpdateReservaUseCase>(UpdateReservaUseCase);
    reservaRepo = module.get('IReservaRepo');
    deletaReservaUseCase = module.get(DeletaReservaUseCase);
    buscaReservaUsuarioUseCase = module.get(BuscaReservaUsuarioUseCase);
    manager = {} as jest.Mocked<EntityManager>;
  });

  it('deve deletar a reserva se a quantidade for igual', async () => {
    const reservaMock = {
      id: 1,
      quantidade: 5,
      validaQuantidade: jest.fn(),
    };
    const param: UpdatereservaDto = {
      evento_id: 1,
      usuario: { sub: 1, username: 'usuario' } as Payload,
      quantidade: 5,
    };

    buscaReservaUsuarioUseCase.execute.mockResolvedValue(reservaMock as any);

    await updateReservaUseCase.execute(param, manager);

    expect(reservaMock.validaQuantidade).toHaveBeenCalledWith(param.quantidade);
    expect(deletaReservaUseCase.execute).toHaveBeenCalledWith(
      reservaMock.id,
      manager,
    );
    expect(reservaRepo.update).not.toHaveBeenCalled();
  });

  it('deve atualizar a reserva se a quantidade for diferente', async () => {
    const reservaMock = {
      id: 1,
      quantidade: 5,
      validaQuantidade: jest.fn(),
    };
    const param: UpdatereservaDto = {
      evento_id: 1,
      usuario: { sub: 1, username: 'usuario' } as Payload,
      quantidade: 3,
    };

    buscaReservaUsuarioUseCase.execute.mockResolvedValue(reservaMock as any);

    await updateReservaUseCase.execute(param, manager);

    expect(reservaMock.validaQuantidade).toHaveBeenCalledWith(param.quantidade);
    expect(reservaMock.quantidade).toBe(param.quantidade);
    expect(reservaRepo.update).toHaveBeenCalledWith(reservaMock, manager);
    expect(deletaReservaUseCase.execute).not.toHaveBeenCalled();
  });
});
