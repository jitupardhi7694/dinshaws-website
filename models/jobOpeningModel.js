const { DataTypes } = require('sequelize');
const sqlize = require('../helpers/init-mysql');

const JobOpening = sqlize.define(
    'job',
    {
        job_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'departments',
                key: 'id',
            },
        },
        name: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'departments',
                key: 'name',
            },
        },
        description: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        location: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
    },
    {
        tableName: 'job',
        timestamps: false,
    }
);

module.exports = JobOpening;
