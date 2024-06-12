"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComprobanteVenta = exports.updateComprobanteVenta = exports.getComprobanteVentaByIdVenta = exports.getComprobanteVentaById = exports.getComprobantesVenta = exports.createComprobanteVenta = void 0;
const comprobante_venta_model_1 = __importDefault(require("../models/comprobante_venta.model"));
const tipo_comprobante_model_1 = __importDefault(require("../models/tipo_comprobante.model"));
const venta_model_1 = __importDefault(require("../models/venta.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const createComprobanteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { igv, descuento, idventa, idtipo_comprobante, num_serie, estado, razon_anulacion, idnotacredito } = req.body;
    try {
        const nuevoComprobanteVenta = yield comprobante_venta_model_1.default.create({ igv, descuento, idventa, idtipo_comprobante, num_serie, estado, razon_anulacion, idnotacredito });
        res.status(201).json(nuevoComprobanteVenta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el Comprobante de Venta' });
    }
});
exports.createComprobanteVenta = createComprobanteVenta;
const getComprobantesVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comprobantesVenta = yield comprobante_venta_model_1.default.findAll({
            include: [
                {
                    model: tipo_comprobante_model_1.default,
                    as: 'TipoComprobante'
                },
                {
                    model: venta_model_1.default,
                    as: 'Venta',
                    include: [
                        {
                            model: empleado_model_1.default,
                            as: 'Empleado'
                        },
                        {
                            model: cliente_model_1.default,
                            as: 'Cliente'
                        },
                    ],
                },
            ],
        });
        res.json(comprobantesVenta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Comprobantes de Venta' });
    }
});
exports.getComprobantesVenta = getComprobantesVenta;
const getComprobanteVentaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const comprobanteVenta = yield comprobante_venta_model_1.default.findByPk(id, {
            include: [
                {
                    model: tipo_comprobante_model_1.default,
                    as: 'TipoComprobante'
                },
                {
                    model: venta_model_1.default,
                    as: 'Venta',
                    include: [
                        {
                            model: empleado_model_1.default,
                            as: 'Empleado'
                        },
                        {
                            model: cliente_model_1.default,
                            as: 'Cliente'
                        },
                    ],
                },
            ],
        });
        if (!comprobanteVenta) {
            res.status(404).json({ msg: 'Comprobante de Venta no encontrado' });
        }
        else {
            res.json(comprobanteVenta);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el Comprobante de Venta' });
    }
});
exports.getComprobanteVentaById = getComprobanteVentaById;
const getComprobanteVentaByIdVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idventa } = req.params;
    try {
        const comprobanteVenta = yield comprobante_venta_model_1.default.findOne({
            where: { idventa },
            include: [
                {
                    model: tipo_comprobante_model_1.default,
                    as: 'TipoComprobante'
                },
                {
                    model: venta_model_1.default,
                    as: 'Venta',
                    include: [
                        {
                            model: empleado_model_1.default,
                            as: 'Empleado'
                        },
                        {
                            model: cliente_model_1.default,
                            as: 'Cliente'
                        },
                    ],
                }
            ],
        });
        if (!comprobanteVenta) {
            res.status(404).json({ msg: 'Comprobante de Venta no encontrado' });
        }
        else {
            res.json(comprobanteVenta);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el Comprobante de Venta' });
    }
});
exports.getComprobanteVentaByIdVenta = getComprobanteVentaByIdVenta;
const updateComprobanteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const comprobanteVenta = yield comprobante_venta_model_1.default.findByPk(id);
        if (comprobanteVenta) {
            yield comprobanteVenta.update(body);
            res.json({ msg: 'El Comprobante de Venta fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un Comprobante de Venta con el id ${id}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el Comprobante de Venta' });
    }
});
exports.updateComprobanteVenta = updateComprobanteVenta;
const deleteComprobanteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const comprobanteVenta = yield comprobante_venta_model_1.default.findByPk(id);
        if (!comprobanteVenta) {
            res.status(404).json({ msg: 'Comprobante de Venta no encontrado' });
        }
        else {
            yield comprobanteVenta.destroy();
            res.json({ msg: 'Comprobante de Venta eliminado con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el Comprobante de Venta' });
    }
});
exports.deleteComprobanteVenta = deleteComprobanteVenta;
