# API de Reserva de Eventos

Este projeto é uma API desenvolvida com o framework NestJS para demonstrar meus conhecimentos em desenvolvimento backend. A API permite o cadastro, atualização, busca e reserva de eventos, além de autenticação JWT de usuários, utilização do MinIO para armazenameto de foto e Redis para fazer o cache de dados mais acessados.

## Tecnologias Utilizadas

- NestJS
- TypeScript
- PostgreSQL
- Redis
- MinIO
- Docker

As Imagens são guardads no Minio, pode ser acessado usando localhost:9001 como padrão.
## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
src/
├── app.module.ts
├── main.ts
├── autenticacao/
│   ├── autenticacao.module.ts
│   ├── decorator/
│   │   ├── tornaRotaPublica.decorator.ts
│   │   └── usuarioAtual.decorator.ts
│   ├── guards/
│   │   └── validaJwt.guard.ts
│   ├── models/
│   └── useCases/
│       ├── login/
│       │   ├── login.controller.ts
│       │   └── login.use-case.ts
│       └── validaUsuario/
│           └── validaUsuario.ts
├── config/
│   ├── minioConfig.ts
│   └── typeormConfig.ts
├── errors/
│   └── errors.interceptor.ts
├── evento/
│   ├── evento.module.ts
│   ├── bucket/
│   │   └── bucket.facade.ts
│   ├── models/
│   │   ├── dtos/
│   │   ├── entities/
│   │   └── interfaces/
│   ├── repository/
│   │   └── eventoRepo.ts
│   └── useCases/
│       ├── atualizaEvento/
│       │   ├── atualizaEvento.controller.ts
│       │   ├── atualizaEvento.spec.ts
│       │   └── atualizaEvento.use-case.ts
│       ├── buscaEventoUsuario/
│       │   ├── bsucaEventoUsuario.controller.ts
│       │   ├── buscaEventoUsuario.spec.ts
│       │   └── buscaEventoUsuario.use-case.ts
│       ├── buscaTodosEventos/
│       │   ├── buscaTodosEventos.controller.ts
│       │   └── buscaTodosEventos.use-case.ts
│       ├── buscaUmEvento/
│       │   ├── buscaUmEvento.controller.ts
│       │   └── buscaUmEvento.use-case.ts
│       ├── buscaUmEventoUsuario/
│       │   └── buscaUmEventoUsuario.use-case.ts
│       ├── criaEvento/
│       │   ├── criaEvento.controller.ts
│       │   ├── criaEvento.spec.ts
│       │   └── criaEvento.use-case.ts
│       └── salvaImagem/
│           ├── salvaImagem.controller.ts
│           └── salvaImagem.use-case.ts
├── reserva/
│   ├── reserva.module.ts
│   ├── models/
│   │   ├── dtos/
│   │   ├── entities/
│   │   └── interfaces/
│   ├── repository/
│   │   └── reservaRepo.ts
│   └── useCases/
│       └── criaReserva/
│           ├── criaReserva.controller.ts
│           └── criaReserva.use-case.ts
└── usuario/
    ├── usuario.module.ts
    ├── models/
    │   ├── dtos/
    │   ├── entities/
    │   └── interfaces/
    ├── repository/
    │   └── usuarioRepo.ts
    └── useCases/
        ├── buscaPorEmail/
        │   ├── buscaPorEmail.spec.ts
        │   └── buscaPorEmail.use-case.ts
        └── criaUsuario/
            ├── craiusuario.controller.ts
            ├── criaUsuario.spec.ts
            └── criaUsuario.use-case.ts
```

## Endpoints

### Autenticação

- **Login**
  - **POST /login**
    - Descrição: Rota responsável por logar o usuário.
    - Payload: `AutenticacaoDto`

### Eventos

- **Criar Evento**

  - **POST /evento**
    - Descrição: Rota responsável por criar um evento.
    - Payload: `CriaEventoDto`

- **Atualizar Evento**

  - **PATCH /evento/:id**
    - Descrição: Rota responsável por atualizar os dados do evento.
    - Payload: `AtualizaEventoDto`

- **Buscar Todos os Eventos**

  - **GET /evento/todos**
    - Descrição: Rota responsável por buscar todos os eventos disponíveis.
    - Query Params: `BuscaTodosEventosDto`

- **Buscar Evento por Usuário**

  - **GET /eventos/usuario**
    - Descrição: Rota responsável por buscar todos os eventos do usuário.
    - Payload: `BuscaEventoUsuarioDto`

- **Buscar Um Evento**

  - **GET /evento/:id**
    - Descrição: Rota responsável por trazer um único evento.

- **Salvar Imagem do Evento**
  - **POST /evento/imagem**
    - Descrição: Rota responsável por enviar uma imagem para o evento.
    - Payload: `SalvaImagemDto`

### Reservas

- **Criar Reserva**
  - **POST /reserva**
    - Descrição: Rota responsável por fazer uma reserva no evento.
    - Payload: `CriaReservaDto`

### Usuários

- **Criar Usuário**
  - **POST /usuario**
    - Descrição: Rota responsável por criar um usuário.
    - Payload: `CriaUsuarioDto`

## Configuração do Projeto

### Instalação

```bash
$ npm install
```

### Compilar e Rodar o Projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Rodar Testes

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
