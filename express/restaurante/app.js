const express = require('express');
const path = require('path'); // Importe o módulo 'path'
const app = express();
const port = 3000;

// Configurar o diretório para arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Rota 1: Página Principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Rota 2: Cardápio
app.get('/cardapio', (req, res) => {
  res.sendFile(path.join(__dirname, 'cardapio.html'));
});

// Rota 3: Fale Conosco
app.get('/fale-conosco', (req, res) => {
  res.sendFile(path.join(__dirname, 'fale.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});