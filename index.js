const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const ZAPI_URL = 'https://api.z-api.io/instances/3E43E8DD1D9DC08F239A669115FAC68F/token/77B09F787B096B72BF713C32/send-text';

app.post('/api/webhook', async (req, res) => {
  const message = req.body.message?.text || req.body.message?.body || req.body.body;
  const sender = req.body.message?.phone || req.body.phone || req.body.sender;

  if (message && sender) {
    try {
      await axios.post(ZAPI_URL, {
        phone: sender,
        message: 'Oi! Eu sou a Isa, assistente virtual da BWR. Como posso te ajudar hoje? 😊'
      });
      res.sendStatus(200);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error.message);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
