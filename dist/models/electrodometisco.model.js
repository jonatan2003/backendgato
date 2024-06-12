"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const Electrodomestico = connection_db_1.default.define('Electrodomestico', {
    marca: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    modelo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    numero_serie: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'electrodomestico',
});
exports.default = Electrodomestico;
