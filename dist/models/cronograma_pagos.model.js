"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const prestamo_model_1 = __importDefault(require("../models/prestamo.model"));
const CronogramaPagos = connection_db_1.default.define('CronogramaPagos', {
    id_prestamo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: prestamo_model_1.default,
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    fecha_pago: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    monto_pagado: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'cronograma_pagos',
});
// Definir relaciones
CronogramaPagos.belongsTo(prestamo_model_1.default, { foreignKey: 'id_prestamo', as: 'Prestamo' });
exports.default = CronogramaPagos;
