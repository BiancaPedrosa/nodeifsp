import express from 'express';
import { engine } from 'express-handlebars'; // Named import for 'engine'
import bodyParser from 'body-parser';
const app = express();
import Produtos from './models/produto.js'; // Assuming produto.js has a default export

//config template engine
import path from 'path';

app.engine('handlebars', engine({
  defaultLayout: 'main',
  extname: '.handlebars'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), 'views'));

//configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
//rota para mostrar a lista de produtos
app.get('/produtos', async (req, res) => {
    try {
        // consulta todos os produtos no banco de dados
        const produtos = await Produtos.findAll({
            order: [['nome', 'ASC']] // Ordena por nome em ordem ascendente
        });

        // Renderiza produtos.handlebars passando os produtos 
        res.render('list_produtos', { 
            // Converte produtos para objetos simples
            produtos: produtos.map(produto => produto.toJSON()) 
        });
    } catch (error) {
        console.error("Erro lendo produtos:", error);
        res.status(500).send("Erro lendo produtos.");
    }
}); 

//rota para adicionar produtos
app.get('/produtos/novo', (req, res) => {
   //mostra o formulário de cadastro de produtos
  res.render('add_produto');
});

//rota para adicionar produtos
// recebe os dados do formulário e salva no banco de dados
app.post('/produtos/adiciona', (req, res) => {
    //grava os dados recebidos
    Produtos.create({
         nome: req.body.nome,
         preco: req.body.preco
      }).then(() => {
  
         res.redirect('/produtos');
      }).catch(err => {
         res.status(500).send('Erro ao cadastrar produto: ' + err.message);
    })
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
