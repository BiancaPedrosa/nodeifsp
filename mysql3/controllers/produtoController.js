// controllers/produtoController.js
import Produtos from '../models/produto.js'; 

const produtoController = {
    // Controller para listar todos os produtos
    listAllProducts: async (req, res) => {
        try {
            const produtos = await Produtos.findAll({
                order: [['createdAt', 'DESC']]
            });
            res.render('produtos', {
                produtos: produtos.map(produto => produto.toJSON())
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).send('Erro ao buscar produtos: ' + error.message);
        }
    },

    // Controller para adicionar um novo produto
    showAddForm: (req, res) => {
        res.render('add_produto');
    },

    // Controller para o POST /produtos/add 
    addNewProduct: async (req, res) => {
        const { nome, descricao, preco } = req.body;
        try {
            await Produtos.create({
                nome: nome,
                descricao: descricao,
                preco: parseFloat(preco)
            });
            res.redirect('/produtos');
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).send('Erro ao adicionar produto: ' + error.message);
        }
    },

    // Controller para exibir o formulário /produtos/edit/:id
    showEditForm: async (req, res) => {
        try {
            const productId = req.params.id;
            const produto = await Produtos.findByPk(productId);
            if (!produto) {
                console.warn(`Produto com ID ${productId} não encontrado para edição.`);
                res.status(404).send('Produto não encontrado.');
                return;
            }
            res.render('edit_produto', { produto: produto.toJSON() });
        } catch (error) {
            console.error("Erro ao buscar produto para edição:", error);
            res.status(500).send('Erro ao buscar produto para edição: ' + error.message);
        }
    },

    // Controller POST /produtos/edit/:id
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const { nome, descricao, preco } = req.body;
            const [affectedRows] = await Produtos.update(
                {
                    nome: nome,
                    descricao: descricao,
                    preco: parseFloat(preco)
                },
                {
                    where: { id: productId }
                }
            );
            if (affectedRows === 0) {
                console.warn(`Produto com ID ${productId} não encontrado ou não atualizado.`);
                res.status(404).send('Produto não encontrado ou nenhum dado alterado.');
            } else {
                console.log(`Produto com ID ${productId} atualizado com sucesso.`);
                res.redirect('/produtos');
            }
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            res.status(500).send('Erro ao atualizar produto: ' + error.message);
        }
    },

    // Controller para deletar produto
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const result = await Produtos.destroy({
                where: { id: productId }
            });
            if (result === 0) {
                console.warn(`Attempted to delete product with ID ${productId}, but it was not found.`);
                res.status(404).send('Produto não encontrado.');
            } else {
                console.log(`Produto com ID ${productId} deletado com sucesso.`);
                res.redirect('/produtos');
            }
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            res.status(500).send('Erro ao deletar produto: ' + error.message);
        }
    }
};

export default produtoController;