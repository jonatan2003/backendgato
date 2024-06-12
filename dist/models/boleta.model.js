"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const detalleventa_model_1 = __importDefault(require("./detalleventa.model"));
const Boleta = connection_db_1.default.define('Boleta', {
    igv: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    descuento: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    iddetalleventa: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'boleta',
});
Boleta.belongsTo(detalleventa_model_1.default, { foreignKey: 'iddetalleventa', as: 'Detalleventa' });
exports.default = Boleta;
