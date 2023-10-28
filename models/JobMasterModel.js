const { DataTypes } = require('sequelize');
const sqlize = require('../helpers/init-mysql');

const JobOpening = sqlize.define(
    'job_openings',
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
        tableName: 'job_openings',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'job_id' }],
            },
            {
                name: 'job_deparment_fk_idx',
                using: 'BTREE',
                fields: [{ name: 'id' }],
            },
        ],
    }
);

module.exports = JobOpening;
