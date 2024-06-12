"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const TipoPago = connection_db_1.default.define('TipoPago', {
    nombre_tipo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'tipo_pago',
});
exports.default = TipoPago;
