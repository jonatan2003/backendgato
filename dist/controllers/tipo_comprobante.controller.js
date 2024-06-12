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
exports.deleteTipoComprobante = exports.updateTipoComprobante = exports.getTipoComprobanteById = exports.getTiposComprobante = exports.createTipoComprobante = void 0;
const tipo_comprobante_model_1 = __importDefault(require("../models/tipo_comprobante.model"));
const tipo_serie_model_1 = __importDefault(require("../models/tipo_serie.model"));
const createTipoComprobante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, idserie } = req.body;
    try {
        const nuevoTipoComprobante = yield tipo_comprobante_model_1.default.create({ nombre, idserie });
        res.status(201).json(nuevoTipoComprobante);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el Tipo de Comprobante' });
    }
});
exports.createTipoComprobante = createTipoComprobante;
const getTiposComprobante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposComprobante = yield tipo_comprobante_model_1.default.findAll({
            include: [{ model: tipo_serie_model_1.default, as: 'TipoSerie' }]
        });
        res.json(tiposComprobante);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Tipos de Comprobante' });
    }
});
exports.getTiposComprobante = getTiposComprobante;
const getTipoComprobanteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipoComprobante = yield tipo_comprobante_model_1.default.findByPk(id);
        if (!tipoComprobante) {
            res.status(404).json({ msg: 'Tipo de Comprobante no encontrado' });
        }
        else {
            res.json(tipoComprobante);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el Tipo de Comprobante' });
    }
});
exports.getTipoComprobanteById = getTipoComprobanteById;
const updateTipoComprobante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const tipoComprobante = yield tipo_comprobante_model_1.default.findByPk(id);
        if (tipoComprobante) {
            yield tipoComprobante.update(body);
            res.json({ msg: 'El Tipo de Comprobante fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un Tipo de Comprobante con el id ${id}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el Tipo de Comprobante' });
    }
});
exports.updateTipoComprobante = updateTipoComprobante;
const deleteTipoComprobante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipoComprobante = yield tipo_comprobante_model_1.default.findByPk(id);
        if (!tipoComprobante) {
            res.status(404).json({ msg: 'Tipo de Comprobante no encontrado' });
        }
        else {
            yield tipoComprobante.destroy();
            res.json({ msg: 'Tipo de Comprobante eliminado con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el Tipo de Comprobante' });
    }
});
exports.deleteTipoComprobante = deleteTipoComprobante;
