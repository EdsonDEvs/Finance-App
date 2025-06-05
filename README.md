<<<<<<< HEAD
# Aplicativo de Finanças Pessoais

Um aplicativo web moderno para gerenciamento de finanças pessoais, com integração com WhatsApp e assistente virtual baseado em IA.

## Funcionalidades

- Dashboard com visão geral das finanças
- Gerenciamento de transações
- Relatórios e análises financeiras
- Integração com WhatsApp para notificações
- Assistente virtual baseado em IA para conselhos financeiros
- Configurações personalizáveis

## Tecnologias Utilizadas

- React com TypeScript
- Material-UI para interface
- Firebase para backend
- OpenAI GPT-4 para assistente virtual
- Chart.js para visualizações
- APIs de WhatsApp para mensagens

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` baseado no `.env.example` e preencha as variáveis de ambiente:
   - `REACT_APP_OPENAI_API_KEY`: Chave da API do OpenAI
   - `REACT_APP_FIREBASE_*`: Configurações do Firebase
   - `REACT_APP_WHATSAPP_*`: Configurações da API do WhatsApp

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

## Assistente Virtual

O assistente virtual utiliza o GPT-4 da OpenAI para fornecer:

- Conselhos financeiros personalizados
- Análise de transações
- Relatórios mensais detalhados
- Sugestões de otimização de gastos
- Metas e objetivos financeiros

Para usar o assistente virtual, você precisa:

1. Obter uma chave de API do OpenAI
2. Configurar a chave no arquivo `.env`
3. O assistente estará disponível no dashboard e na página de relatórios

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes React reutilizáveis
  ├── pages/         # Páginas da aplicação
  ├── services/      # Serviços e integrações
  ├── hooks/         # Hooks personalizados
  ├── types/         # Definições de tipos TypeScript
  ├── config/        # Configurações
  └── utils/         # Funções utilitárias
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Suporte

Para suporte, envie um email para seu-email@exemplo.com ou abra uma issue no GitHub. 
=======
# Finance App - Aplicativo de Controle Financeiro

Um aplicativo web moderno para controle financeiro pessoal, construído com React, TypeScript e Firebase.

## Funcionalidades

- 📊 Dashboard com visão geral das finanças
- 💰 Gerenciamento de receitas e despesas
- 📈 Relatórios e gráficos detalhados
- 🔒 Autenticação segura
- 📱 Design responsivo
- 🌙 Tema claro/escuro
- 🔔 Sistema de notificações

## Tecnologias Utilizadas

- React com TypeScript
- Material-UI (MUI) para interface
- Firebase (Auth e Firestore)
- Chart.js para gráficos
- React Router para navegação

## Pré-requisitos

1. Node.js instalado (https://nodejs.org/)
2. Firebase CLI instalado globalmente
   ```bash
   npm install -g firebase-tools
   ```
3. Uma conta Google para usar o Firebase

## Configuração do Projeto

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd finance-app
   ```

2. Instale as dependências:
   ```bash
   cd web
   npm install
   ```

3. Configure o Firebase:
   - Crie um novo projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative o Authentication e o Firestore
   - Copie as configurações do Firebase para `src/config/firebase.ts`

4. Faça login no Firebase CLI:
   ```bash
   firebase login
   ```

5. Implante as regras do Firestore:
   ```bash
   firebase deploy --only firestore:rules
   ```

6. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Estrutura do Projeto

```
web/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── config/        # Configurações (Firebase, etc.)
│   ├── contexts/      # Contextos React (Auth, etc.)
│   ├── pages/         # Páginas da aplicação
│   ├── services/      # Serviços (API, etc.)
│   └── App.tsx        # Componente principal
├── public/            # Arquivos públicos
└── package.json       # Dependências e scripts
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm run preview` - Visualiza a versão de produção localmente

## Segurança

- Autenticação gerenciada pelo Firebase Auth
- Regras de segurança do Firestore para proteger os dados
- Validação de dados no cliente e servidor
- Sanitização de inputs

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contato

Seu Nome - [seu-email@exemplo.com](mailto:seu-email@exemplo.com)

Link do Projeto: [https://github.com/seu-usuario/finance-app](https://github.com/seu-usuario/finance-app) 
>>>>>>> 3bd94917501b3fde866b11869d6b0a9ffd17da84
