import { Test, TestingModule } from '@nestjs/testing';
import { BuscaEventoUsuarioDto } from 'src/evento/models/dtos/buscaEventoUsuario.dto';
import { BuscaEventoUsuarioUseCase } from './buscaEventoUsuario.use-case';

describe('BuscaEventoUsuarioUseCase', () => {
  const mockEventoRepo = {
    buscaEventosUsuario: jest.fn(),
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
      const param: BuscaEventoUsuarioDto = { usuario_id: 1 };
      const eventos = [{ id: 1, titulo: 'Evento Teste' }];
      mockEventoRepo.buscaEventosUsuario.mockResolvedValue(eventos);

      const result = await buscaEventoUsuarioUseCase.execute(param);

      expect(result).toEqual(eventos);
      expect(mockEventoRepo.buscaEventosUsuario).toHaveBeenCalledTimes(1);
      expect(mockEventoRepo.buscaEventosUsuario).toHaveBeenCalledWith(
        param.usuario_id,
      );
    });
  });
});
