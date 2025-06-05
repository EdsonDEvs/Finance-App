# Finance App

Um aplicativo web para gerenciamento financeiro pessoal, desenvolvido com Next.js, Material-UI e Firebase.

## Funcionalidades

- Dashboard com visão geral das finanças
- Gerenciamento de transações
- Relatórios e gráficos
- Assistente virtual financeiro
- Configurações personalizáveis
- Integração com WhatsApp para notificações

## Tecnologias Utilizadas

- Next.js 14
- React 18
- TypeScript
- Material-UI
- Chart.js
- Firebase
- Axios

## Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Conta no Firebase
- Conta no WhatsApp Business API (opcional)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/finance-app.git
cd finance-app
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Acesse o aplicativo em `http://localhost:3000`

## Estrutura do Projeto

```
finance-app/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── services/      # Serviços e integrações
│   ├── config/        # Configurações
│   ├── hooks/         # Custom hooks
│   ├── types/         # Definições de tipos
│   └── styles/        # Estilos globais
├── public/            # Arquivos estáticos
└── ...
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
