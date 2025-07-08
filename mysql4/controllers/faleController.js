// controllers/produtoController.js
import FaleConosco from '../models/faleConosco.js'; 

const faleController = {
    // Controller para adicionar um novo produto
    showFormFaleConosco: (req, res) => {
        res.render('faleconosco');
    },

    // Controller para o POST /produtos/add 
    addNewMensagem: async (req, res) => {
        const { nome, email, mensagem } = req.body;
        try {
            await FaleConosco.create({
                nome: nome,
                email: email,
                mensagem: mensagem
            });
            res.redirect('/');
        } catch (error) {
            console.error("Error adding mensagem: ", error);
            res.status(500).send('Erro ao adicionar mensagem: ' + error.message);
        }
    }
};

export default faleController;