const { DataTypes } = require('sequelize');
const sqlize = require('../helpers/init-mysql');

const ContactUs = sqlize.define(
    'business_enquiry',
    {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(75),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        mobile: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        purpose: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
    },
    {
        tableName: 'business_enquiry',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = ContactUs;
