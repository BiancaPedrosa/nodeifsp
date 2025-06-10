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
export default Produtos;
