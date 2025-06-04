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