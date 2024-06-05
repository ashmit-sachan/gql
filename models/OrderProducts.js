// models/OrderProducts.js
module.exports = (sequelize, DataTypes) => {
    const OrderProducts = sequelize.define('OrderProducts', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        OrderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Orders',
                key: 'OrderId'
            },
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Products',
                key: 'id'
            },
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    });

    OrderProducts.associate = (models) => {
        OrderProducts.belongsTo(models.Orders, { foreignKey: 'OrderId' });
        OrderProducts.belongsTo(models.Products, { foreignKey: 'productId' });
    };

    return OrderProducts;
};