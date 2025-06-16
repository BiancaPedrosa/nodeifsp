import Sequelize from 'sequelize';
const sequelize = new Sequelize('restaurante', 'root', '', {
   host: "localhost",
   dialect: 'mysql'
});
export { Sequelize, sequelize };
