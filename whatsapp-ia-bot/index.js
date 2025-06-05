require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/webhook', async (req, res) => {
  const userMessage = req.body.Body;
  const from = req.body.From;

  try {
    // Chama a OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Você é um assistente financeiro pessoal. Responda de forma clara e objetiva.' },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    // Responde no WhatsApp
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: from,
      body: aiResponse,
    });

    res.send('<Response></Response>');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao processar mensagem');
  }
});

app.listen(3001, () => console.log('Webhook rodando na porta 3001'));
