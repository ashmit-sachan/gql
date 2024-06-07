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
        blocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        updatedAt: false
    });

    Users.associate = (models) => {
        Users.hasMany(models.Reviews, { foreignKey: 'userId' });
        Users.hasMany(models.Orders, { foreignKey: 'userId' });
        Users.hasMany(models.Carts, { foreignKey: 'userId' });
    };

    return Users;
};