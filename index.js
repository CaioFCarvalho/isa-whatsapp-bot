const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const ZAPI_URL = 'https://api.z-api.io/instances/3E43E8DD1D9DC08F239A669115FAC68F/token/77B09F787B096B72BF713C32/send-text';

app.post('/api/webhook', async (req, res) => {
  try {
    const body = req.body;
    const message = body?.message?.text || body?.message?.body || body?.body;
    const sender = body?.message?.phone || body?.phone || body?.sender;

    console.log('Mensagem recebida:', message);
    console.log('Número de quem enviou:', sender);

    if (message && sender) {
      await axios.post(ZAPI_URL, {
        phone: sender,
        message: 'Oi! Eu sou a Isa, assistente virtual da BWR. Como posso te ajudar hoje?'
      });
      return res.sendStatus(200);
    }

    return res.sendStatus(400);
  } catch (error) {
    console.error('Erro no webhook:', error.message);
    return res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
