/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const twilio = require("twilio");

// Inicialização do Firebase Admin
admin.initializeApp();

// Configuração do Twilio usando variáveis de ambiente
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID || "ACca179320fc731adac2dbcb6338f1f76c",
  process.env.TWILIO_AUTH_TOKEN || "a2ef8ffd4e8eeaee6eb0a088025f9dac"
);
const twilioWhatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER || "+14155238886";

// Função auxiliar para enviar mensagem via WhatsApp
async function sendWhatsAppMessage(to, message) {
  try {
    await twilioClient.messages.create({
      from: `whatsapp:${twilioWhatsappNumber}`,
      to: `whatsapp:${to}`,
      body: message,
    });
    return true;
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    return false;
  }
}

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Webhook do WhatsApp via Twilio
exports.whatsappWebhook = onRequest(async (req, res) => {
  // Verificar se é uma mensagem do WhatsApp via Twilio
  const body = req.body;
  
  if (body.Body && body.From) {
    const userMessage = body.Body;
    const senderId = body.From; // Formato: whatsapp:+5511999999999
    
    // Registrar no Firestore
    await admin.firestore().collection("messages").add({
      sender: senderId,
      text: userMessage,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      profile: {
        name: body.ProfileName || "Usuário",
        number: senderId.replace("whatsapp:", ""),
      },
    });

    // Processar a mensagem e enviar resposta personalizada
    let responseMessage = "Recebemos sua mensagem! Processando...";
    
    // Exemplo de processamento básico de comandos
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("saldo")) {
      responseMessage = "Seu saldo atual é R$ 1.000,00";
    } else if (lowerMessage.includes("extrato")) {
      responseMessage = "Últimas transações:\n- Netflix: R$ 39,90\n- Mercado: R$ 150,00\n- Farmácia: R$ 75,30";
    } else if (lowerMessage.includes("ajuda")) {
      responseMessage = "Comandos disponíveis:\n- Saldo\n- Extrato\n- Ajuda";
    }

    // Enviar resposta via Twilio
    await sendWhatsAppMessage(senderId.replace("whatsapp:", ""), responseMessage);

    // Resposta para o webhook
    res.type("text/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<Response></Response>`);
  } else {
    res.status(400).json({
      error: "Mensagem inválida",
    });
  }
});
