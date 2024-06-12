"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const NotaCredito = connection_db_1.default.define('NotaCredito', {
    descripcion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: 'notacredito',
    createdAt: false,
    updatedAt: false,
});
exports.default = NotaCredito;
