const express = require('express');
const app = express();
const port = 3000;

// Rota 1: Página Principal
app.get('/', (req, res) => {
  res.send(`
    <h1>Bem-vindo ao Nosso Restaurante!</h1>
    <p>Experimente nossas especialidades deliciosas e desfrute de um ambiente acolhedor.</p>
    <a href="/cardapio">Veja nosso cardápio</a> | <a href="/fale-conosco">Fale conosco</a>
  `);
});

// Rota 2: Cardápio
app.get('/cardapio', (req, res) => {
  const cardapio = [
    { nome: 'Prato 1', descricao: 'Descrição do Prato 1', preco: 'R$ 20,00' },
    { nome: 'Prato 2', descricao: 'Descrição do Prato 2', preco: 'R$ 25,00' },
    { nome: 'Prato 3', descricao: 'Descrição do Prato 3', preco: 'R$ 30,00' },
  ];

  let cardapioHTML = '<h1>Nosso Cardápio</h1><ul>';
  cardapio.forEach(prato => {
    cardapioHTML += `<li>${prato.nome} - ${prato.descricao} - ${prato.preco}</li>`;
  });
  cardapioHTML += '</ul><a href="/">Voltar para a página principal</a>';

  res.send(cardapioHTML);
});

// Rota 3: Fale Conosco
app.get('/fale-conosco', (req, res) => {
  res.send(`
    <h1>Fale Conosco</h1>
    <form>
      <label for="nome">Nome:</label><br>
      <input type="text" id="nome" name="nome"><br><br>
      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email"><br><br>
      <label for="mensagem">Mensagem:</label><br>
      <textarea id="mensagem" name="mensagem"></textarea><br><br>
      <input type="submit" value="Enviar">
    </form>
    <a href="/">Voltar para a página principal</a>
  `);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});