const fetch = require('node-fetch');

async function testWebhook() {
  try {
    const response = await fetch(
      'https://us-central1-finance-app-452d3.cloudfunctions.net/whatsappWebhook',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            from: '+5511999999999',
            text: 'Olá, gostaria de ver meu saldo',
          },
        }),
      }
    );

    const data = await response.json();
    console.log('Resposta:', data);
  } catch (error) {
    console.error('Erro:', error);
  }
}

testWebhook(); 