const { DataTypes } = require('sequelize');
const sqlize = require('../helpers/init-mysql');

const ResumeProfile = sqlize.define(
    'resume_profile',
    {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        job_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'job_openings',
                key: 'job_id',
            },
        },
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        middle_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        marital_status: {
            type: DataTypes.STRING(75),
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(75),
            allowNull: false,
        },
        mobile_number: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        local_address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        permanent_address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ssc_school: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        ssc_pass_year: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        ssc_grade: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        hsc_school: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        hsc_pass_year: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        hsc_grade: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        graduate_school: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        graduate_pass_year: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        graduate_grade: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        pgraduate_school: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        pgraduate_pass_year: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        pgraduate_grade: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        company_name1: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        position1: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        doj1: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dol1: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reason_fjc1: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        company_name2: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        position2: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        doj2: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dol2: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reason_fjc2: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        company_name3: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        position3: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        doj3: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dol3: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reason_fjc3: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        company_name4: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        position4: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        doj4: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dol4: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reason_fjc4: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        company_name5: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        position5: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        doj5: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dol5: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reason_fjc5: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        person_name1: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        contact_number1: {
            type: DataTypes.INTEGER(12),
            allowNull: false,
        },
        email1: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        remarks1: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        person_name2: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        contact_number2: {
            type: DataTypes.INTEGER(12),
            allowNull: false,
        },
        email2: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        remarks2: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
    },
    {
        tableName: 'resume_profile',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id' }],
            },
            {
                name: 'job_id_pk',
                using: 'BTREE',
                fields: [{ name: 'job_id' }],
            },
        ],
    }
);

module.exports = ResumeProfile;
