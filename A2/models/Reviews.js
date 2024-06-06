module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define('Reviews', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            }
        },
        review: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.STRING,
            references: {
                model: 'Users',
                key: 'email'
            }
        }
    });

    return Reviews;
};