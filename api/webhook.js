import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  const message = req.body?.data?.message?.text;
  const sender = req.body?.data?.sender;

  if (!message || !sender) {
    return res.status(400).json({ error: 'Mensagem ou remetente ausente.' });
  }

  try {
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Você é a ISA, atendente da BWR. Responda como um humano educado, sem gírias, sem emojis. Explique termos técnicos entre parênteses. Nunca diga que é uma IA.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = openaiResponse.data.choices?.[0]?.message?.content || 'Desculpe, não entendi. Pode repetir?';

    await axios.post(`${process.env.ZAPI_URL}`, {
      phone: sender,
      message: reply,
    });

    res.status(200).json({ status: 'Mensagem enviada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar a mensagem' });
  }
}
