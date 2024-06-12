"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const empleado_model_1 = __importDefault(require("./empleado.model"));
const cliente_model_1 = __importDefault(require("./cliente.model"));
const Venta = connection_db_1.default.define('Venta', {
    idempleado: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    idcliente: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fecha_venta: {
        type: sequelize_1.DataTypes.DATE,
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    tipo_pago: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'venta',
});
// Definir la relación con la tabla Empleado
Venta.belongsTo(empleado_model_1.default, { foreignKey: 'idempleado', as: 'Empleado' });
// Definir la relación con la tabla Prestamo
Venta.belongsTo(cliente_model_1.default, { foreignKey: 'idcliente', as: 'Cliente' });
exports.default = Venta;
