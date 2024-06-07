// models/Cart.js
module.exports = (sequelize, DataTypes) => {
    const Carts = sequelize.define('Carts', {
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Products',
                key: 'id'
            },
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            references: {
                model: 'Users',
                key: 'email'
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

    Carts.associate = (models) => {
        Carts.belongsTo(models.Users, { foreignKey: 'userId' });
        Carts.belongsTo(models.Products, { foreignKey: 'productId' });
    };

    return Carts;
};