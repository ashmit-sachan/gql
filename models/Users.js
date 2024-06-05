// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./index');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // date_of_joining: {
        //     type: DataTypes.DATE,
        //     allowNull: false
        // },
        blocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        updatedAt: false
    });

    return Users;
};