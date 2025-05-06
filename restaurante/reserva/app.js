const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

//config template engine
app.engine('handlebars', engine({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.get('/reserva', (req, res) => {
   //mostra o formulário de reserva
  res.render('formulario');
});

app.post('/reserva', (req, res) => {
    //mostra os dados recebidos
   const { nome, email, data } = req.body;
   res.send(`dados recebidos: ${nome} ${email} ${data}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});