const axios = require('axios');

const ZAPI_URL = 'https://api.z-api.io/instances/3E43E8DD1D9DC08F239A669115FAC68F/token/77B09F787B096B72BF713C32/send-text';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Método não permitido');
  }

  const message = req.body.message?.text || req.body.message?.body || req.body.body;
  const sender = req.body.message?.phone || req.body.phone || req.body.sender;

  if (message && sender) {
    try {
      await axios.post(ZAPI_URL, {
        phone: sender,
        message: 'Oi! Eu sou a Isa, assistente virtual da BWR. Como posso te ajudar hoje?'
      });
      return res.status(200).send('Mensagem enviada com sucesso');
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err.message);
      return res.status(500).send('Erro ao enviar mensagem');
    }
  } else {
    return res.status(400).send('Dados inválidos');
  }
};
