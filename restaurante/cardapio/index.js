express = require("express")
const fs = require('fs');// Importa o módulo 'fs' para manipulação de arquivos
const path = require('path');// Importa o módulo 'path' para manipulação de caminhos de arquivos
// importa o modulo cardapio 
const cardapio = require("./cardapio.js");

const app = express();

const PORT = 3000;

app.get("/cardapio", function(req,res)
{     const produtos = JSON.parse(cardapio.getProdutos(path.join(__dirname, 'cardapio.json')));
      const tabela = cardapio.showProdutos(produtos);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(tabela);
      res.end();
});

app.listen(PORT, () => {
   console.log(`Servidor rodando em http://localhost:${PORT}`);
});
