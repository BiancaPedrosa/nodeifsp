// app.js for a simple reservation system using Express and Handlebars
const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs');
// importa o modulo cardapio 
const cardapio = require("./cardapio.js");

//configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//serve static files from directory
app.use('/css', express.static(path.join(__dirname, 'css'))); // serve static files from 'css' directory  
app.use('/img', express.static(path.join(__dirname, 'img'))); // serve static files from 'img' directory
app.use('/models', express.static(path.join(__dirname, 'models'))); // serve static files from 'img' directory

//config template engine
app.engine('handlebars', engine({

  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

//Routes
app.get('/', (req, res) => {
   //mostra a página inicial
  res.render('home');
});

app.get('/reserva', (req, res) => {
   //mostra o formulário de reserva
  res.render('reserva');
});

app.post('/reserva', (req, res) => {

     const formData = req.body;
     const filePath = path.join(__dirname, './models/reservas.json');
     let reservas = [];
   
     // Verifica se o arquivo já existe e lê o conteúdo reservas.json
     if (fs.existsSync(filePath)) {
       const data = fs.readFileSync(filePath, 'utf8', (error)=>{
         if (error) {
             console.error('Erro ao ler o arquivo:', error.message);
             return res.status(500).send('Erro ao salvar reserva.');
           }
         });
         if (data) {
           mensagens = JSON.parse(data);
         }
     }
     // Adiciona a nova reserva ao array
       reservas.push(formData);
       console.log(reservas); 
       // Salva as reservas no arquivo JSON 
       fs.writeFileSync(filePath, JSON.stringify(reservas, null, 2), (error) => {
         if (error) {
           console.error('Erro ao salvar reserva:', error.message);
             res.render("mensagem", {
                erro: 'Ocorreu um erro ao enviar sua reserva. Por favor, tente novamente mais tarde.'
           });
          }
    }); 
       console.log('reserva salva com sucesso!');
        res.render("mensagem", {
      successo: 'Sua reserva foi enviada com sucesso. Obrigado por entrar em contato conosco. Aguardamos ansiosos para recebê-lo em nosso restaurante.'
    })
   });
   

app.get('/faleconosco', (req, res) => {
   //mostra o formulário de reserva
  res.render('faleconosco');
});

app.post('/faleconosco', (req, res) => {
  const formData = req.body;
    const filePath = path.join(__dirname, './models/mensagens.json');
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
        res.render("mensagem", {
          erro: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.'
        });
      }
    });
    console.log('mensagem salva com sucesso!');
    res.render("mensagem", {
      successo: 'Sua mensagem foi enviada com sucesso. Obrigado por entrar em contato conosco. Responderemos o mais breve possível.'
    })
});

app.get("/cardapio", function(req,res)
{   const produtos = JSON.parse(cardapio.getProdutos(path.join(__dirname, './models/cardapio.json')));
    try {
        // Renderiza produtos.handlebars passando os produtos 
        res.render('cardapio', { 
            // Converte produtos para objetos simples
            produtos: produtos
        });
    } catch (error) {
        console.error("Erro lendo produtos:", error);
        res.status(500).send("Erro lendo produtos.");
    }
}); 

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});