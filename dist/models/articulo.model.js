"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const categoria_model_1 = __importDefault(require("./categoria.model"));
const vehiculo_model_1 = __importDefault(require("./vehiculo.model"));
const electrodometisco_model_1 = __importDefault(require("./electrodometisco.model"));
const Articulo = connection_db_1.default.define('Articulo', {
    idcategoria: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    idvehiculo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    idelectrodomestico: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    observaciones: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'articulo',
});
// Definir las relaciones con las tablas Categoria, Vehiculo y Electrodomestico
Articulo.belongsTo(categoria_model_1.default, { foreignKey: 'idcategoria', as: 'Categoria' });
Articulo.belongsTo(vehiculo_model_1.default, { foreignKey: 'idvehiculo', as: 'Vehiculo' });
Articulo.belongsTo(electrodometisco_model_1.default, { foreignKey: 'idelectrodomestico', as: 'Electrodomestico' });
exports.default = Articulo;
