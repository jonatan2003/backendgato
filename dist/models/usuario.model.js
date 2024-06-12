"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const empleado_model_1 = __importDefault(require("./empleado.model"));
const Usuario = connection_db_1.default.define('Usuario', {
    id_empleado: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Asegura que el nombre de usuario sea único
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    permiso: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    modelName: 'Usuario',
    tableName: 'usuario',
});
// Establece la relación con Empleado
Usuario.belongsTo(empleado_model_1.default, { foreignKey: 'id_empleado', as: 'Empleado' });
exports.default = Usuario;
