const http = require('http');
const port = 3000;
const server = http.createServer((req, res) => {
  let pagina = '';
  const rota = req.url; // Obtém a rota da URL da requisição
  console.log(`Rota acessada: ${rota}`);

  // Lógica de roteamento
  if (rota === '/') {
    pagina = '<html><body>Estou na rota principal</body></html>';
  } else if (rota === '/notas') {
    pagina = '<html><body>Aqui devo exibir as notas</body></html>';
  } else if (rota === '/slides') {
    pagina = '<html><body>Aqui devo exibir os slides</body></html>';
  } else {
    pagina = '<html><body>Rota não encontrada</body></html>';
  }

  // Define o cabeçalho da resposta e envia o conteúdo
  res.writeHead(200, { 'Content-Type': 'text/html' }); // Indica que o conteúdo é HTML
  res.end(pagina);
});

server.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
