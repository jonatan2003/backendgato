"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const tipo_comprobante_model_1 = __importDefault(require("./tipo_comprobante.model"));
const venta_model_1 = __importDefault(require("./venta.model"));
const notacredito_model_1 = __importDefault(require("./notacredito.model"));
const ComprobanteVenta = connection_db_1.default.define('ComprobanteVenta', {
    idventa: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: venta_model_1.default,
            key: 'id'
        }
    },
    igv: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    descuento: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    idtipo_comprobante: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: tipo_comprobante_model_1.default,
            key: 'id'
        }
    },
    num_serie: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('EMITIDO', 'ANULADO'),
        defaultValue: 'EMITIDO',
        allowNull: false,
    },
    razon_anulacion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    idnotacredito: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: notacredito_model_1.default,
            key: 'id'
        }
    }
}, {
    tableName: 'comprobante_venta',
    createdAt: false,
    updatedAt: false,
});
// Relaciones
ComprobanteVenta.belongsTo(venta_model_1.default, { foreignKey: 'idventa', as: 'Venta' });
ComprobanteVenta.belongsTo(tipo_comprobante_model_1.default, { foreignKey: 'idtipo_comprobante', as: 'TipoComprobante' });
ComprobanteVenta.belongsTo(notacredito_model_1.default, { foreignKey: 'idnotacredito', as: 'NotaCredito' });
exports.default = ComprobanteVenta;
