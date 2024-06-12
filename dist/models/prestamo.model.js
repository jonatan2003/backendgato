"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const articulo_model_1 = __importDefault(require("./articulo.model"));
const cliente_model_1 = __importDefault(require("./cliente.model"));
const Prestamo = connection_db_1.default.define('Prestamo', {
    idcliente: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    idarticulo: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fecha_prestamo: {
        type: sequelize_1.DataTypes.DATE,
    },
    fecha_devolucion: {
        type: sequelize_1.DataTypes.DATE,
    },
    monto_prestamo: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    monto_pago: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'prestamo',
});
// Definir las relaciones con las tablas Empleado, Articulo y Cliente
Prestamo.belongsTo(articulo_model_1.default, { foreignKey: 'idarticulo', as: 'Articulo' });
Prestamo.belongsTo(cliente_model_1.default, { foreignKey: 'idcliente', as: 'Cliente' });
exports.default = Prestamo;
