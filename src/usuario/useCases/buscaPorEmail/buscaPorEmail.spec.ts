import { Test, TestingModule } from '@nestjs/testing';
import { BuscaPorEmailUseCase } from './buscaPorEmail.use-case';
import { UsuarioEntity } from 'src/usuario/models/entities/usuario.entity';

describe('BuscaPorEmailUseCase', () => {
  let mockRepository = { buscaPorEmail: jest.fn() };
  let buscaPorEmailUseCase: BuscaPorEmailUseCase;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BuscaPorEmailUseCase,
        { provide: 'IUsuarioRepo', useValue: mockRepository },
      ],
    }).compile();
    buscaPorEmailUseCase =
      module.get<BuscaPorEmailUseCase>(BuscaPorEmailUseCase);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });
  it('', () => {
    expect(buscaPorEmailUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('Deve buscar o dados do usuario por email passado como parametro.', async () => {
      const param = 'fulano@gmail.com';
      const usuario = new UsuarioEntity(
        'fulano',
        'fulano@gmail.com',
        '$2b$10$vD78fAu/QufYTqfRukccJO2LNNYjttxKhP/SkO4IXI76CfIQEZuUC',
      );

      mockRepository.buscaPorEmail.mockReturnValue(usuario);

      const data = await buscaPorEmailUseCase.execute(param);

      expect(data).toHaveProperty('email', 'fulano@gmail.com');
    });
  });

  it('Deve retornar um erro caso não seja passado um email', async () => {
    const param = null;
    await expect(buscaPorEmailUseCase.execute(param)).rejects.toThrow(
      'Informe um email.',
    );
  });
});
