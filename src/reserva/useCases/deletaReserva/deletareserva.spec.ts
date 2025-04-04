import { Test, TestingModule } from '@nestjs/testing';
import { DeletaReservaUseCase } from './deletareserva.use-case';
import { IReservaRepo } from 'src/reserva/models/interfaces/reservaRepo.interface';
import { EntityManager } from 'typeorm';

describe('DeletaReservaUseCase', () => {
  let deletaReservaUseCase: DeletaReservaUseCase;
  let reservaRepo: jest.Mocked<IReservaRepo>;
  let manager: jest.Mocked<EntityManager>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletaReservaUseCase,
        {
          provide: 'IReservaRepo',
          useValue: {
            deletaReserva: jest.fn(),
          },
        },
      ],
    }).compile();

    deletaReservaUseCase =
      module.get<DeletaReservaUseCase>(DeletaReservaUseCase);
    reservaRepo = module.get('IReservaRepo');
    manager = {} as jest.Mocked<EntityManager>;
  });

  it('deve deletar a reserva com sucesso', async () => {
    const reservaId = 1;

    reservaRepo.deletaReserva.mockResolvedValue(undefined);

    await deletaReservaUseCase.execute(reservaId, manager);

    expect(reservaRepo.deletaReserva).toHaveBeenCalledWith(reservaId, manager);
  });

  it('deve lançar um erro se a exclusão falhar', async () => {
    const reservaId = 1;

    reservaRepo.deletaReserva.mockRejectedValue(
      new Error('Erro ao deletar reserva'),
    );

    await expect(
      deletaReservaUseCase.execute(reservaId, manager),
    ).rejects.toThrow('Erro ao deletar reserva');

    expect(reservaRepo.deletaReserva).toHaveBeenCalledWith(reservaId, manager);
  });
});
