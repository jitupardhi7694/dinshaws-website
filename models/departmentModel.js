const { DataTypes } = require('sequelize');
const sqlize = require('../helpers/init-mysql');

const Departments = sqlize.define(
    'departments',
    {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
    },
    {
        tableName: 'departments',
        timestamps: false,
    }
);

module.exports = Departments;
