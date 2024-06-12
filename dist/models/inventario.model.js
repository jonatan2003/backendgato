"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const articulo_model_1 = __importDefault(require("./articulo.model")); // Asegúrate de que la ruta sea correcta
const Inventario = connection_db_1.default.define('Inventario', {
    idarticulo: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    estado_articulo: {
        type: sequelize_1.DataTypes.STRING,
    },
    valor_venta: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    valor_precio: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'inventario',
});
// Definir la relación con la tabla Articulo
Inventario.belongsTo(articulo_model_1.default, { foreignKey: 'idarticulo', as: 'Articulo' });
exports.default = Inventario;
