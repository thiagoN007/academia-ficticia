const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/duvida', async (req, res) => {
  const prompt = req.body.prompt;
  const chave_api = process.env.CHAVE_API;

  try {
    const resposta = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${chave_api}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: `Você é um assistente virtual da Builder Academia. ...` },
          { role: 'user', content: prompt }
        ]
      })
    });
    const dados = await resposta.json();
    if (dados.choices && dados.choices[0] && dados.choices[0].message) {
      res.json({ resposta: dados.choices[0].message.content });
    } else {
      res.status(500).json({ resposta: 'Desculpe, não consegui obter uma resposta da IA. Tente novamente mais tarde.' });
    }
  } catch (e) {
    res.status(500).json({ resposta: 'Erro ao conectar com a IA: ' + e.message });
  }
});

module.exports = app;
