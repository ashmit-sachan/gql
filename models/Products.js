module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        special: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        updatedAt: false
    });

    Products.associate = (models) => {
        Products.hasMany(models.Reviews, { foreignKey: 'productId' });
    };

    return Products;
};
