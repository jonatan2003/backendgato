"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const tipo_pago_model_1 = __importDefault(require("./tipo_pago.model"));
const Pago = connection_db_1.default.define('Pago', {
    id_tipopago: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    fecha_pago: {
        type: sequelize_1.DataTypes.DATE,
    },
    interes_pago: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    monto_restante: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    capital_pago: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'pago',
});
Pago.belongsTo(tipo_pago_model_1.default, { foreignKey: 'id_tipopago', as: 'TipoPago' });
exports.default = Pago;
