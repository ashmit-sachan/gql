// models/Orders.js
module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define('Orders', {
        OrderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        userId: {
            type: DataTypes.STRING,
            references: {
                model: 'Users',
                key: 'email'
            },
            allowNull: false
        }
    },
    {
        updatedAt: false
    });

    Orders.associate = (models) => {
        Orders.belongsTo(models.Users, { foreignKey: 'userId' });
    };

    return Orders;
};