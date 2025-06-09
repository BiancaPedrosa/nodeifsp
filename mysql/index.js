const Express= require('express');
const bodyParser = require('body-parser');
const { sequelize, Produtos } = require('./conecta');
const app = Express();
app.use(bodyParser.json());
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produtos.findAll();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});
app.post('/produtos', async (req, res) => {
    try {
        const { nome, preco } = req.body;
        const produto = await Produtos.create({ nome, preco });
        res.status(201).json(produto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
});
app.put('/produtos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco } = req.body;
        const produto = await Produtos.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        produto.nome = nome;
        produto.preco = preco;
        await produto.save();
        res.json(produto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});
app.delete('/produtos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produtos.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        await produto.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
});
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    sequelize.authenticate()
        .then(() => {
            console.log('Conexão com o banco de dados estabelecida com sucesso.');
        })
        .catch(err => {
            console.error('Não foi possível conectar ao banco de dados:', err);
        });
});
// Exemplo de uso do Sequelize com Express para gerenciar produtos em um banco de dados MySQL