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
exports.deleteVenta = exports.updateVenta = exports.getVentaById = exports.getVentas = exports.createVenta = void 0;
const venta_model_1 = __importDefault(require("../models/venta.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const createVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idempleado, idcliente, fecha_venta, total, tipo_pago } = req.body;
    try {
        // Verificar si el empleado asociado a la venta y el préstamo existen
        const empleadoExistente = yield empleado_model_1.default.findByPk(idempleado);
        const clienteExistente = yield cliente_model_1.default.findByPk(idcliente);
        if (!empleadoExistente || !clienteExistente) {
            return res.status(400).json({ msg: 'El empleado o el cliente especificado no existe' });
        }
        const nuevaVenta = yield venta_model_1.default.create({
            idempleado,
            idcliente,
            fecha_venta,
            total,
            tipo_pago,
        });
        res.status(201).json(nuevaVenta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear la venta' });
    }
});
exports.createVenta = createVenta;
const getVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ventas = yield venta_model_1.default.findAll({
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: cliente_model_1.default, as: 'Cliente' },
            ],
        });
        res.json(ventas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de ventas' });
    }
});
exports.getVentas = getVentas;
const getVentaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idVenta } = req.params;
    try {
        const venta = yield venta_model_1.default.findByPk(idVenta, {
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: cliente_model_1.default, as: 'Cliente' },
            ],
        });
        if (!venta) {
            res.status(404).json({ msg: 'Venta no encontrada' });
        }
        else {
            res.json(venta);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la venta' });
    }
});
exports.getVentaById = getVentaById;
const updateVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idVenta } = req.params;
    try {
        const venta = yield venta_model_1.default.findByPk(idVenta);
        if (venta) {
            // Verificar si el empleado asociado a la venta y el préstamo existen
            if (body.idempleado) {
                const empleadoExistente = yield empleado_model_1.default.findByPk(body.idempleado);
                if (!empleadoExistente) {
                    return res.status(400).json({ msg: 'El empleado especificado no existe' });
                }
            }
            if (body.idcliente) {
                const clienteExistente = yield cliente_model_1.default.findByPk(body.idcliente);
                if (!clienteExistente) {
                    return res.status(400).json({ msg: 'El cliente especificado no existe' });
                }
            }
            yield venta.update(body);
            res.json({ msg: 'La venta fue actualizada con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe una venta con el id ${idVenta}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar la venta' });
    }
});
exports.updateVenta = updateVenta;
const deleteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idVenta } = req.params;
    try {
        const venta = yield venta_model_1.default.findByPk(idVenta);
        if (!venta) {
            res.status(404).json({ msg: 'Venta no encontrada' });
        }
        else {
            yield venta.destroy();
            res.json({ msg: 'Venta eliminada con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar la venta' });
    }
});
exports.deleteVenta = deleteVenta;
