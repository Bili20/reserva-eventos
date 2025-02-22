import { Test, TestingModule } from '@nestjs/testing';
import { CriaEventoUseCase } from './criaEvento.use-case';
import { CriaEventoDto } from 'src/evento/models/dtos/criaEvento.dto';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';

describe('CriaEventoUseCase', () => {
  const mockRepository = {
    criar: jest.fn(),
  };
  let criaEventoUseCase: CriaEventoUseCase;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CriaEventoUseCase,
        { provide: 'IEventoRepo', useValue: mockRepository },
      ],
    }).compile();
    criaEventoUseCase = module.get<CriaEventoUseCase>(CriaEventoUseCase);
  });

  it('', () => {
    expect(criaEventoUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('Deve criar um evento corretamente.', async () => {
      const payload = new Payload();
      payload.sub = 10;
      payload.username = 'usuario@gmail.com';
      const param = new CriaEventoDto();
      param.titulo = 'um titulo';
      param.descricao = 'uma descricao';
      param.capacidade = 1000;
      param.data = new Date(new Date().setDate(new Date().getDate() + 1));
      param.horario = '10:50';
      param.localizacao = '-26.2343063,-51.0646751,14.75z';
      param.valor = 250.25;

      mockRepository.criar.mockReturnValue(null);

      await criaEventoUseCase.execute(param, payload);

      expect(mockRepository.criar).toHaveBeenCalledTimes(1);
    });
  });
});
