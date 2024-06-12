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
exports.getUltimoElectrodomestico = exports.deleteElectrodomestico = exports.updateElectrodomestico = exports.getElectrodomesticoById = exports.getElectrodomesticos = exports.createElectrodomestico = void 0;
const electrodometisco_model_1 = __importDefault(require("../models/electrodometisco.model"));
// Crear un nuevo electrodoméstico
const createElectrodomestico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { marca, modelo, color, numero_serie, descripcion } = req.body;
    try {
        // Verificar si ya existe un electrodoméstico con el mismo numero_serie
        const electrodomesticoExistente = yield electrodometisco_model_1.default.findOne({ where: { numero_serie } });
        if (electrodomesticoExistente) {
            return res.status(400).json({ msg: 'Ya existe un electrodoméstico con este número de serie' });
        }
        // Crear un nuevo electrodoméstico si no existe
        const nuevoElectrodomestico = yield electrodometisco_model_1.default.create({
            marca,
            modelo,
            color,
            numero_serie,
            descripcion,
        });
        res.status(201).json(nuevoElectrodomestico);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el electrodoméstico' });
    }
});
exports.createElectrodomestico = createElectrodomestico;
// Obtener todos los electrodomésticos
const getElectrodomesticos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const electrodomesticos = yield electrodometisco_model_1.default.findAll();
        res.json(electrodomesticos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de electrodomésticos' });
    }
});
exports.getElectrodomesticos = getElectrodomesticos;
// Obtener un electrodoméstico por su ID
const getElectrodomesticoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const electrodomestico = yield electrodometisco_model_1.default.findByPk(id);
        if (electrodomestico) {
            res.json(electrodomestico);
        }
        else {
            res.status(404).json({ msg: 'Electrodoméstico no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el electrodoméstico' });
    }
});
exports.getElectrodomesticoById = getElectrodomesticoById;
// Actualizar un electrodoméstico
const updateElectrodomestico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, marca, modelo, color, numero_serie, descripcion } = req.body;
    try {
        const electrodomestico = yield electrodometisco_model_1.default.findByPk(id);
        if (electrodomestico) {
            yield electrodomestico.update({ nombre, marca, modelo, color, numero_serie, descripcion });
            res.json({ msg: 'Electrodoméstico actualizado correctamente' });
        }
        else {
            res.status(404).json({ msg: 'Electrodoméstico no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el electrodoméstico' });
    }
});
exports.updateElectrodomestico = updateElectrodomestico;
// Eliminar un electrodoméstico
const deleteElectrodomestico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const electrodomestico = yield electrodometisco_model_1.default.findByPk(id);
        if (electrodomestico) {
            yield electrodomestico.destroy();
            res.json({ msg: 'Electrodoméstico eliminado correctamente' });
        }
        else {
            res.status(404).json({ msg: 'Electrodoméstico no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el electrodoméstico' });
    }
});
exports.deleteElectrodomestico = deleteElectrodomestico;
const getUltimoElectrodomestico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Realizar una consulta para obtener el último electrodoméstico ingresado
        const ultimoElectrodomestico = yield electrodometisco_model_1.default.findOne({
            order: [['id', 'DESC']], // Ordenar por ID de forma descendente para obtener el último electrodoméstico ingresado
        });
        res.json(ultimoElectrodomestico);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el último electrodoméstico ingresado' });
    }
});
exports.getUltimoElectrodomestico = getUltimoElectrodomestico;
