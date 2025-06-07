import type { NextApiRequest, NextApiResponse } from 'next';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Chave da OpenAI não configurada.' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt não fornecido.' });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Você é um assistente financeiro pessoal, responda de forma clara e objetiva.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });
    const data = await openaiRes.json();
    const result = data.choices?.[0]?.message?.content?.trim() || '';
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao se comunicar com a OpenAI.' });
  }
}
