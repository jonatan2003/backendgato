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
exports.deleteTipoPago = exports.updateTipoPago = exports.getTipoPagoById = exports.getTiposPago = exports.createTipoPago = void 0;
const tipo_pago_model_1 = __importDefault(require("../models/tipo_pago.model"));
const createTipoPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_tipo } = req.body;
    try {
        const nuevoTipoPago = yield tipo_pago_model_1.default.create({ nombre_tipo });
        res.status(201).json(nuevoTipoPago);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el tipo de pago' });
    }
});
exports.createTipoPago = createTipoPago;
const getTiposPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposPago = yield tipo_pago_model_1.default.findAll();
        res.json(tiposPago);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de tipos de pago' });
    }
});
exports.getTiposPago = getTiposPago;
const getTipoPagoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipoPago = yield tipo_pago_model_1.default.findByPk(id);
        if (!tipoPago) {
            res.status(404).json({ msg: 'Tipo de pago no encontrado' });
        }
        else {
            res.json(tipoPago);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el tipo de pago' });
    }
});
exports.getTipoPagoById = getTipoPagoById;
const updateTipoPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const tipoPago = yield tipo_pago_model_1.default.findByPk(id);
        if (tipoPago) {
            yield tipoPago.update(body);
            res.json({ msg: 'El tipo de pago fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un tipo de pago con el id ${id}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el tipo de pago' });
    }
});
exports.updateTipoPago = updateTipoPago;
const deleteTipoPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipoPago = yield tipo_pago_model_1.default.findByPk(id);
        if (!tipoPago) {
            res.status(404).json({ msg: 'Tipo de pago no encontrado' });
        }
        else {
            yield tipoPago.destroy();
            res.json({ msg: 'Tipo de pago eliminado con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el tipo de pago' });
    }
});
exports.deleteTipoPago = deleteTipoPago;
