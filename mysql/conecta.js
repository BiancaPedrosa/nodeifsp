const Sequelize=require('sequelize')
const sequelize=new Sequelize('restaurante','root','', {
   host: "localhost",
   dialect: 'mysql'
})

sequelize.authenticate()
.then(() => {
   console.log('Conexão com o banco de dados estabelecida com sucesso.')
}
).catch(err => {
   console.error('Não foi possível conectar ao banco de dados:', err)
})

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
   console.log('Tabela Produtos criada ou já existe.')
}).catch(err => {
   console.error('Erro ao criar tabela Produtos:', err)
})
Produtos.create({
   nome: 'Pizza',
   preco: 29.90
}).then(() => {
   console.log('Produto inicial criado com sucesso.')
}).catch(err => {
   console.error('Erro ao criar produto inicial:', err)
})  

module.exports = {
   sequelize,
   Produtos
}