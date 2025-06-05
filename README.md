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