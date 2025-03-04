import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { BuscaEventoUsuarioUseCase } from './buscaEventoUsuario.use-case';
import { BuscaEventoUsuarioDto } from 'src/evento/models/dtos/buscaEventoUsuario.dto';

describe('BuscaEventoUsuarioUseCase', () => {
  const mockEventoRepo = {
    buscaEventoUsuario: jest.fn(),
  };

  let buscaEventoUsuarioUseCase: BuscaEventoUsuarioUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BuscaEventoUsuarioUseCase,
        { provide: 'IEventoRepo', useValue: mockEventoRepo },
      ],
    }).compile();

    buscaEventoUsuarioUseCase = module.get<BuscaEventoUsuarioUseCase>(
      BuscaEventoUsuarioUseCase,
    );
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(buscaEventoUsuarioUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('deve retornar os eventos quando encontrados', async () => {
      const param: BuscaEventoUsuarioDto = { usuario_id: 1, id: 2 };
      const eventos = [{ id: 1, titulo: 'Evento Teste' }];
      mockEventoRepo.buscaEventoUsuario.mockResolvedValue(eventos);

      const result = await buscaEventoUsuarioUseCase.execute(param);

      expect(result).toEqual(eventos);
      expect(mockEventoRepo.buscaEventoUsuario).toHaveBeenCalledTimes(1);
      expect(mockEventoRepo.buscaEventoUsuario).toHaveBeenCalledWith(
        param.usuario_id,
        param.id,
      );
    });

    it('deve lançar BadRequestException se nenhum evento for encontrado', async () => {
      const param: BuscaEventoUsuarioDto = { usuario_id: 1, id: 2 };
      mockEventoRepo.buscaEventoUsuario.mockResolvedValue([]);

      try {
        await buscaEventoUsuarioUseCase.execute(param);
        fail('Deveria ter lançado uma exceção');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response).toEqual({
          message: 'Nenhum evento encontrado.',
        });
      }
    });
  });
});
