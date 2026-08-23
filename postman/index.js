const express = require('express');
const app = express();

// 1. CONFIGURAÇÃO (Obrigatório vir ANTES das rotas)
app.use(express.json()); 

// 2. A SUA ROTA (Onde estava dando erro)
app.post('/usuarios', (req, res) => {
    // Agora o req.body não será mais undefined
    const { nome, email } = req.body; 
    
    console.log(nome);
    res.send(`Olá ${nome}`);
});

app.listen(3000, () => console.log("Servidor ON"));