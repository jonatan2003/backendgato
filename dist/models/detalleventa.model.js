"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const venta_model_1 = __importDefault(require("./venta.model"));
const articulo_model_1 = __importDefault(require("./articulo.model"));
const DetalleVenta = connection_db_1.default.define('DetalleVenta', {
    idventa: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    idarticulo: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    precio_unitario: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    subtotal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'detalleventa',
});
// Definir la relación con la tabla Venta
DetalleVenta.belongsTo(venta_model_1.default, { foreignKey: 'idventa', as: 'Venta' });
DetalleVenta.belongsTo(articulo_model_1.default, { foreignKey: 'idarticulo', as: 'Articulo' });
exports.default = DetalleVenta;
