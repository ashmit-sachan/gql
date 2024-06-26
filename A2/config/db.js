const {Sequelize, DataTypes} = require('sequelize');

const database = 's3873827_fsd_a2';
const username = 's3873827_fsd_a2';
const password = 'abc123';

// Create a new Sequelize instance
const sequelize = new Sequelize(database, username, password, {
    host: 'rmit.australiaeast.cloudapp.azure.com',
    dialect: 'mysql',
});

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
    
module.exports = sequelize;