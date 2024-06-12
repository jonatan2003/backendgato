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
exports.deleteCategoria = exports.updateCategoria = exports.getCategoriaById = exports.getCategorias = exports.createCategoria = void 0;
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const createCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    try {
        const nuevaCategoria = yield categoria_model_1.default.create({
            nombre,
        });
        res.status(201).json(nuevaCategoria);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear la categoría' });
    }
});
exports.createCategoria = createCategoria;
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield categoria_model_1.default.findAll();
        res.json(categorias);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de categorías' });
    }
});
exports.getCategorias = getCategorias;
const getCategoriaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCategoria } = req.params;
    try {
        const categoria = yield categoria_model_1.default.findByPk(idCategoria);
        if (!categoria) {
            res.status(404).json({ msg: 'Categoría no encontrada' });
        }
        else {
            res.json(categoria);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la categoría' });
    }
});
exports.getCategoriaById = getCategoriaById;
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idCategoria } = req.params;
    try {
        const categoria = yield categoria_model_1.default.findByPk(idCategoria);
        if (categoria) {
            yield categoria.update(body);
            res.json({ msg: 'La categoría fue actualizada con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe una categoría con el id ${idCategoria}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar la categoría' });
    }
});
exports.updateCategoria = updateCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCategoria } = req.params;
    try {
        const categoria = yield categoria_model_1.default.findByPk(idCategoria);
        if (!categoria) {
            res.status(404).json({ msg: 'Categoría no encontrada' });
        }
        else {
            yield categoria.destroy();
            res.json({ msg: 'Categoría eliminada con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar la categoría' });
    }
});
exports.deleteCategoria = deleteCategoria;
