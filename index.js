require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const twilio = require('twilio');

const app = express();
app.use(express.json());

// Configuração da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Configuração do Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Rota do webhook
app.post('/webhook', async (req, res) => {
  try {
    const { Body, From } = req.body;

    // Gera resposta usando OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Você é um assistente financeiro útil e amigável."
        },
        {
          role: "user",
          content: Body
        }
      ],
    });

    const resposta = completion.choices[0].message.content;

    // Envia resposta via Twilio
    await twilioClient.messages.create({
      body: resposta,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: From
    });

    res.status(200).send('OK');
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Webhook rodando!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Webhook rodando na porta ${PORT}`);
});
