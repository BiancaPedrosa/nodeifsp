const express = require('express'); //importe o módulo 'express'
const fs= require('fs'); // importe o módulo 'fs' para manipulação de arquivos
const bodyParser= require('body-parser'); // Importe o módulo 'body-parser'
const path = require('path'); // Importe o módulo 'path'
const { error } = require('console');
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
app.get('/fale', (req, res) => {
  res.sendFile(path.join(__dirname, 'fale.html'));
});

//Rota 4: Salvar Mensagem
app.post('/salvar-mensagem',(req, res) => {
  const formData = req.body;
  const filePath = path.join(__dirname, 'mensagens.json');
  let mensagens = [];

  // Verifica se o arquivo já existe e lê o conteúdo mensagens.json
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8', (error)=>{
      if (error) {
          console.error('Erro ao ler o arquivo:', error.message);
          return res.status(500).send('Erro ao salvar mensagem.');
        }
      });
      if (data) {
        mensagens = JSON.parse(data);
      }
  }
  // Adiciona a nova mensagem ao array
    mensagens.push(formData);
    console.log(mensagens); 
    // Salva as mensagens no arquivo JSON 
    fs.writeFileSync(filePath, JSON.stringify(mensagens, null, 2), (error) => {
      if (error) {
        console.error('Erro ao salvar mensagem:', error.message);
        return res.status(500).send('Erro ao salvar mensagem.');
      }
    });
    console.log('Mensagem salva com sucesso!');
    res.send('Mensagem salva com sucesso!');
});



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});