import { Sequelize, sequelize } from './db.js'; // Import named exports

const Mensagens = sequelize.define('faleConosco', {
   id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
  nome: {
      type: Sequelize.STRING,
      allowNull: false
   },
   email:{   
      type: Sequelize.STRING,
      allowNull: false
   },
   mensagem: {
      type: Sequelize.STRING,
      allowNull: false
   }
})
sequelize.sync({ force: false })
   .then(() => {  
      console.log('Tabela fale conosco criada com sucesso!');
   })
   .catch((error) => {
      console.error('Erro ao criar faleConosco!', error);
   });
// Export the Produtos model
export default Mensagens;
