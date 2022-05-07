const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('genre', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: { //es obligatorio? preguntar
            type: DataTypes.STRING,
        }
    })
}