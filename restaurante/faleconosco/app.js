const express = require('express'); //importe o módulo 'express'
const bodyParser= require('body-parser'); // Importe o módulo 'body-parser'
const path = require('path'); // Importe o módulo 'path'

const app = express();
const port = 3000;

// Configurar o diretório para arquivos estáticos
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false})); //para processar dados de formulários

// Rota 1: Página Principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
  });

// Rota 2: Cardápio
app.get('/cardapio', (req, res) => {
  res.sendFile(path.join(__dirname, 'cardapio.html'));
});

// Rota 3: Fale Conosco
app.get('/faleconosco', (req, res) => {
  res.sendFile(path.join(__dirname, 'faleconosco.html'));
});

app.post('/salvar-mensagem',(req, res) => {
  res.write("Mensagem recebida: " + req.body.nome + " - " + req.body.email + " - " + req.body.mensagem); 
  res.end();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
