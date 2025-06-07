require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

// Verifica variáveis de ambiente
console.log('Verificando variáveis de ambiente...');
if (!process.env.OPENAI_API_KEY) {
  console.error('Erro: Variável de ambiente OPENAI_API_KEY não encontrada!');
  process.exit(1);
}

const app = express();
app.use(bodyParser.json());

console.log('Inicializando OpenAI...');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Rota para processar mensagens
app.post('/chat', async (req, res) => {
  console.log('Recebendo mensagem:', req.body);
  const userMessage = req.body.message?.trim();

  if (!userMessage) {
    return res.status(400).json({
      error: 'Por favor, envie uma mensagem válida.'
    });
  }

  try {
    console.log('Chamando OpenAI...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente financeiro pessoal. Responda de forma clara, objetiva e em português. Mantenha suas respostas concisas e úteis.'
        },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    console.log('Resposta da OpenAI:', aiResponse);

    if (!aiResponse) {
      throw new Error('Resposta vazia da OpenAI');
    }

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('Erro detalhado:', err);
    res.status(500).json({
      error: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.'
    });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do Assistente Financeiro rodando!');
});

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    openai: process.env.OPENAI_API_KEY ? 'Configurada' : 'Não configurada'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
  console.log('Configurações:');
  console.log('- OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Configurada' : 'Não configurada');
});
