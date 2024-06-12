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
exports.deletePago = exports.updatePago = exports.getPagoById = exports.getPagos = exports.createPago = void 0;
const pago_model_1 = __importDefault(require("../models/pago.model"));
const tipo_pago_model_1 = __importDefault(require("../models/tipo_pago.model"));
const createPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipopago, fecha_pago, interes_pago, monto_restante, capital_pago } = req.body;
    try {
        const nuevoPago = yield pago_model_1.default.create({
            id_tipopago,
            fecha_pago,
            interes_pago,
            monto_restante,
            capital_pago,
        });
        res.status(201).json(nuevoPago);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el Pago' });
    }
});
exports.createPago = createPago;
const getPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagos = yield pago_model_1.default.findAll({
            include: [
                { model: tipo_pago_model_1.default, as: 'TipoPago',
                },
            ],
        });
        res.json(pagos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Pagos' });
    }
});
exports.getPagos = getPagos;
const getPagoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pago = yield pago_model_1.default.findByPk(id, {
            include: [
                { model: tipo_pago_model_1.default, as: 'TipoPago',
                },
            ],
        });
        if (!pago) {
            res.status(404).json({ msg: 'Pago no encontrado' });
        }
        else {
            res.json(pago);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el Pago' });
    }
});
exports.getPagoById = getPagoById;
const updatePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idPago } = req.params;
    try {
        const pago = yield pago_model_1.default.findByPk(idPago);
        if (pago) {
            yield pago.update(body);
            res.json({ msg: 'El pago fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un pago con el id ${idPago}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el Pago' });
    }
});
exports.updatePago = updatePago;
const deletePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pago = yield pago_model_1.default.findByPk(id);
        if (!pago) {
            res.status(404).json({ msg: 'Pago no encontrado' });
        }
        else {
            yield pago.destroy();
            res.json({ msg: 'Pago eliminado con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el Pago' });
    }
});
exports.deletePago = deletePago;
