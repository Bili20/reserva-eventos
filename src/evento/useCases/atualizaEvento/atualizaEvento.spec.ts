import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Payload } from 'src/autenticacao/models/dtos/payload.dto';
import { AtualizaEventoDto } from 'src/evento/models/dtos/atualizaEvento.dto';
import { BuscaUmEventoUsecase } from '../buscaUmEvento/buscaUmEvento.use-case';
import { AtualizaEventoUseCase } from './atualizaEvento.use-case';

describe('AtualizaEventoUseCase', () => {
  const mockEventoRepo = {
    atualiza: jest.fn(),
  };
  const mockBuscaUmEventoUsecase = {
    execute: jest.fn(),
  };

  let atualizaEventoUseCase: AtualizaEventoUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AtualizaEventoUseCase,
        { provide: 'IEventoRepo', useValue: mockEventoRepo },
        { provide: BuscaUmEventoUsecase, useValue: mockBuscaUmEventoUsecase },
      ],
    }).compile();

    atualizaEventoUseCase = module.get<AtualizaEventoUseCase>(
      AtualizaEventoUseCase,
    );
    jest.clearAllMocks();
  });

  it('Deve estar definido', () => {
    expect(atualizaEventoUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('Deve atualizar um evento corretamente.', async () => {
      const payload = new Payload();
      payload.sub = 10;
      payload.username = 'usuario@gmail.com';

      const param = new AtualizaEventoDto();
      param.titulo = 'Título atualizado';
      param.descricao = 'Descrição atualizada';
      param.data = new Date(new Date().setDate(new Date().getDate() + 1));
      param.horario = '11:00';
      param.capacidade = 500;
      param.localizacao = '-26.2343063,-51.0646751,14.75z';
      param.valor = 150.75;

      const eventoMock = { validaData: jest.fn() };

      mockBuscaUmEventoUsecase.execute.mockResolvedValue(eventoMock);
      mockEventoRepo.atualiza.mockResolvedValue(null);

      await atualizaEventoUseCase.execute(1, param, payload);

      expect(mockBuscaUmEventoUsecase.execute).toHaveBeenCalledTimes(1);
      expect(mockBuscaUmEventoUsecase.execute).toHaveBeenCalledWith(1);

      expect(eventoMock.validaData).toHaveBeenCalledTimes(1);
      expect(eventoMock.validaData).toHaveBeenCalledWith(param.data);

      expect(mockEventoRepo.atualiza).toHaveBeenCalledTimes(1);
      expect(mockEventoRepo.atualiza).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          titulo: param.titulo,
          descricao: param.descricao,
          data: param.data,
          horario: param.horario,
          capacidade: param.capacidade,
          localizacao: param.localizacao,
          valor: param.valor,
          usuario_id: payload.sub,
        }),
      );
    });

    it('Deve lançar HttpException se ocorrer um erro durante a atualização.', async () => {
      const payload = new Payload();
      payload.sub = 10;
      payload.username = 'usuario@gmail.com';

      const param = new AtualizaEventoDto();
      param.titulo = 'Título atualizado';
      param.descricao = 'Descrição atualizada';
      param.data = new Date(new Date().setDate(new Date().getDate() + 1));
      param.horario = '11:00';
      param.capacidade = 500;
      param.localizacao = '-26.2343063,-51.0646751,14.75z';
      param.valor = 150.75;

      const error = { response: 'Erro teste', status: 400 };
      mockBuscaUmEventoUsecase.execute.mockRejectedValue(error);

      await expect(
        atualizaEventoUseCase.execute(1, param, payload),
      ).rejects.toThrow(HttpException);
    });
  });
});
