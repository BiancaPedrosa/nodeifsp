// script.js (Node.js com Express)

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Array para armazenar os carros (simulação de um banco de dados em memória)
const carros = [];
let proximoId = 1;

// Rota POST para criar um novo carro
app.post('/carros', (req, res) => {
  const { modelo, marca, ano } = req.body;

  if (!modelo || !marca || !ano) {
    return res.status(400).json({ mensagem: 'Por favor, forneça modelo, marca e ano do carro.' });
  }

  const novoCarro = {
    id: proximoId++,
    modelo,
    marca,
    ano,
  };

  carros.push(novoCarro);
  res.status(201).json({ mensagem: 'Carro criado com sucesso!', carro: novoCarro });
});

// Rota GET para recuperar todos os carros
app.get('/carros', (req, res) => {
  res.status(200).json(carros);
});

// Rota GET para recuperar um carro específico por ID
app.get('/carros/:id', (req, res) => {
  const carroId = parseInt(req.params.id);
  const carro = carros.find((c) => c.id === carroId);

  if (carro) {
    res.status(200).json(carro);
  } else {
    res.status(404).json({ mensagem: 'Carro não encontrado.' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});