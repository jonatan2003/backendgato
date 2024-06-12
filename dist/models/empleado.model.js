"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const Empleado = connection_db_1.default.define('Empleado', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dni: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha_nacimiento: {
        type: sequelize_1.DataTypes.DATE,
    },
    fecha_contratacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    genero: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tipo_contrato: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('ACTIVO', 'INACTIVO'),
        defaultValue: 'ACTIVO',
        allowNull: false,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'empleado',
});
exports.default = Empleado;
