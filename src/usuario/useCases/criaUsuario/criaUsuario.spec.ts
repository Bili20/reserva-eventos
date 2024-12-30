import { Test, TestingModule } from '@nestjs/testing';
import { CriaUsuarioUseCase } from './criaUsuario.use-case';
import { CriaUsuarioDto } from '../../models/dtos/criaUsuario.dto';

describe('CriaUsuarioUseCase', () => {
  const mockRepository = {
    criar: jest.fn(),
  };
  let criaUsuarioUseCase: CriaUsuarioUseCase;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CriaUsuarioUseCase,
        { provide: 'IUsuarioRepo', useValue: mockRepository },
      ],
    }).compile();
    criaUsuarioUseCase = module.get<CriaUsuarioUseCase>(CriaUsuarioUseCase);
  });

  it('', () => {
    expect(criaUsuarioUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('Deve Criar um usuario corretamente', async () => {
      const param = new CriaUsuarioDto();
      param.nome = 'fulano';
      param.email = 'fulano@gmail.com';
      param.senha = 'senha';

      mockRepository.criar.mockReturnValue(null);

      await criaUsuarioUseCase.execute(param);

      expect(mockRepository.criar).toHaveBeenCalledTimes(1);
    });
  });
});
