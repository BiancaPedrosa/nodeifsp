import Sequelize from 'sequelize';
const sequelize = new Sequelize('restaurante', 'root', 'ifsp', {
   host: "localhost",
   dialect: 'mysql'
});
export { Sequelize, sequelize };
