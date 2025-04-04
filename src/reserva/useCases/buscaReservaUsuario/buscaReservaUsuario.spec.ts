import { Test, TestingModule } from '@nestjs/testing';
import { BuscaReservaUsuarioUseCase } from './buscaReservaUsuario.use-case';
import { IReservaRepo } from 'src/reserva/models/interfaces/reservaRepo.interface';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

describe('BuscaReservaUsuarioUseCase', () => {
  let buscaReservaUsuarioUseCase: BuscaReservaUsuarioUseCase;
  let reservaRepo: jest.Mocked<IReservaRepo>;
  let usuario = { sub: 1, username: 'usuario' } as Payload;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BuscaReservaUsuarioUseCase,
        {
          provide: 'IReservaRepo',
          useValue: {
            buscaReservaUsuario: jest.fn(),
          },
        },
      ],
    }).compile();

    buscaReservaUsuarioUseCase = module.get<BuscaReservaUsuarioUseCase>(
      BuscaReservaUsuarioUseCase,
    );
    reservaRepo = module.get('IReservaRepo');
  });

  it('deve retornar a reserva do usuário com sucesso', async () => {
    const eventoId = 1;
    const usuarioId = usuario.sub;
    const reservaMock = { id: 1, evento_id: eventoId, usuario_id: usuarioId };

    reservaRepo.buscaReservaUsuario.mockResolvedValue(reservaMock as any);

    const result = await buscaReservaUsuarioUseCase.execute(eventoId, usuario);

    expect(reservaRepo.buscaReservaUsuario).toHaveBeenCalledWith(
      eventoId,
      usuarioId,
    );
    expect(result).toEqual(reservaMock);
  });

  it('deve lançar um erro se a reserva não for encontrada', async () => {
    const eventoId = 1;
    const usuarioId = 1;

    reservaRepo.buscaReservaUsuario.mockResolvedValue(null);

    await expect(
      buscaReservaUsuarioUseCase.execute(eventoId, usuario),
    ).rejects.toThrow('Reserva não encontrada');

    expect(reservaRepo.buscaReservaUsuario).toHaveBeenCalledWith(
      eventoId,
      usuarioId,
    );
  });
});
