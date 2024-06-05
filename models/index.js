// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Define your models and relationships here
const db = {};
// db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('./Users')(sequelize, Sequelize.DataTypes);
db.Products = require('./Products')(sequelize, Sequelize.DataTypes);
db.Reviews = require('./Reviews')(sequelize, Sequelize.DataTypes);

// Define associations
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize.sync({force: false})
.then(() => {
    console.log("DataBase is in sync");
});

// Export the sequelize instance
module.exports = db;