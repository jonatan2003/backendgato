"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const pago_model_1 = __importDefault(require("./pago.model"));
const prestamo_model_1 = __importDefault(require("./prestamo.model"));
const empleado_model_1 = __importDefault(require("./empleado.model"));
const Ticket = connection_db_1.default.define('Ticket', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    num_serie: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: true,
    },
    num_ticket: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: true,
    },
    idempleado: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    idpago: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: pago_model_1.default,
            key: 'id'
        }
    },
    idprestamo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: prestamo_model_1.default,
            key: 'id'
        }
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'ticket',
});
// Definir las relaciones
Ticket.belongsTo(pago_model_1.default, { foreignKey: 'idpago', as: 'Pago' });
Ticket.belongsTo(prestamo_model_1.default, { foreignKey: 'idprestamo', as: 'Prestamo' });
Ticket.belongsTo(empleado_model_1.default, { foreignKey: 'idempleado', as: 'Empleado' });
exports.default = Ticket;
