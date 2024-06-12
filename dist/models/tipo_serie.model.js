"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const TipoSerie = connection_db_1.default.define('TipoSerie', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'tipo_serie',
});
exports.default = TipoSerie;
