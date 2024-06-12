"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const tipo_serie_model_1 = __importDefault(require("./tipo_serie.model"));
const TipoComprobante = connection_db_1.default.define('TipoComprobante', {
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    idserie: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: tipo_serie_model_1.default,
            key: 'id',
        },
    },
}, {
    tableName: 'tipo_comprobante',
    createdAt: false,
    updatedAt: false,
});
TipoComprobante.belongsTo(tipo_serie_model_1.default, { foreignKey: 'idserie', as: 'TipoSerie' });
exports.default = TipoComprobante;
