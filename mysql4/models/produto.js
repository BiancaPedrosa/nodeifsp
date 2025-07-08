import { Sequelize, sequelize } from './db.js'; // Import named exports

const Produtos = sequelize.define('produtos', {
   id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
  nome: {
      type: Sequelize.STRING,
      allowNull: false
   },
   preco: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
   }
})
sequelize.sync({ force: false })
   .then(() => {  
      console.log('Tabela produtos criada com sucesso!');
   })
   .catch((error) => {
      console.error('Erro ao criar tabela produtos:', error);
   });
// Export the Produtos model
export default Produtos;
