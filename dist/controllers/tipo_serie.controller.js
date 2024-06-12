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
exports.deleteTipoSerie = exports.updateTipoSerie = exports.getTipoSerieById = exports.getTiposSerie = exports.createTipoSerie = void 0;
const tipo_serie_model_1 = __importDefault(require("../models/tipo_serie.model"));
const createTipoSerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    try {
        const nuevoTipoSerie = yield tipo_serie_model_1.default.create({ nombre });
        res.status(201).json(nuevoTipoSerie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el Tipo de Serie' });
    }
});
exports.createTipoSerie = createTipoSerie;
const getTiposSerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposSerie = yield tipo_serie_model_1.default.findAll();
        res.json(tiposSerie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Tipos de Serie' });
    }
});
exports.getTiposSerie = getTiposSerie;
const getTipoSerieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipoSerie = yield tipo_serie_model_1.default.findByPk(id);
        if (!tipoSerie) {
            res.status(404).json({ msg: 'Tipo de Serie no encontrado' });
        }
        else {
            res.json(tipoSerie);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el Tipo de Serie' });
    }
});
exports.getTipoSerieById = getTipoSerieById;
const updateTipoSerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const tipoSerie = yield tipo_serie_model_1.default.findByPk(id);
        if (tipoSerie) {
            yield tipoSerie.update(body);
            res.json({ msg: 'El Tipo de Serie fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un Tipo de Serie con el id ${id}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el Tipo de Serie' });
    }
});
exports.updateTipoSerie = updateTipoSerie;
const deleteTipoSerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipoSerie = yield tipo_serie_model_1.default.findByPk(id);
        if (!tipoSerie) {
            res.status(404).json({ msg: 'Tipo de Serie no encontrado' });
        }
        else {
            yield tipoSerie.destroy();
            res.json({ msg: 'Tipo de Serie eliminado con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el Tipo de Serie' });
    }
});
exports.deleteTipoSerie = deleteTipoSerie;
