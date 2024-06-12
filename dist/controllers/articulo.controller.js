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
exports.getArticulosElectrodomestico = exports.getArticulosVehiculo = exports.deleteArticulo = exports.updateArticulo = exports.getArticuloById = exports.getArticulos = exports.createArticulo = void 0;
const articulo_model_1 = __importDefault(require("../models/articulo.model"));
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const vehiculo_model_1 = __importDefault(require("../models/vehiculo.model"));
const electrodometisco_model_1 = __importDefault(require("../models/electrodometisco.model"));
const sequelize_1 = require("sequelize");
// Crear un nuevo artículo
const createArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idcategoria, idvehiculo, idelectrodomestico, observaciones, estado, numero_serie } = req.body;
    try {
        // Verificar si la categoría asociada al artículo existe
        const categoriaExistente = yield categoria_model_1.default.findByPk(idcategoria);
        if (!categoriaExistente) {
            return res.status(400).json({ msg: 'La categoría especificada no existe' });
        }
        // Verificar si el vehículo asociado al artículo existe
        if (idvehiculo) {
            const vehiculoExistente = yield vehiculo_model_1.default.findByPk(idvehiculo);
            if (!vehiculoExistente) {
                return res.status(400).json({ msg: 'El vehículo especificado no existe' });
            }
        }
        // Verificar si el electrodoméstico asociado al artículo existe
        if (idelectrodomestico) {
            const electrodomesticoExistente = yield electrodometisco_model_1.default.findByPk(idelectrodomestico);
            if (!electrodomesticoExistente) {
                return res.status(400).json({ msg: 'El electrodoméstico especificado no existe' });
            }
        }
        const nuevoArticulo = yield articulo_model_1.default.create({
            idcategoria,
            idvehiculo,
            idelectrodomestico,
            observaciones,
            estado,
            numero_serie
        });
        res.status(201).json(nuevoArticulo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el artículo' });
    }
});
exports.createArticulo = createArticulo;
// Obtener todos los artículos
const getArticulos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articulos = yield articulo_model_1.default.findAll({
            include: [
                { model: categoria_model_1.default, as: 'Categoria' },
                { model: vehiculo_model_1.default, as: 'Vehiculo' },
                { model: electrodometisco_model_1.default, as: 'Electrodomestico' }
            ]
        });
        res.json(articulos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de artículos' });
    }
});
exports.getArticulos = getArticulos;
// Obtener un artículo por su ID
const getArticuloById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const articulo = yield articulo_model_1.default.findByPk(id, {
            include: [
                { model: categoria_model_1.default, as: 'Categoria' },
                { model: vehiculo_model_1.default, as: 'Vehiculo' },
                { model: electrodometisco_model_1.default, as: 'Electrodomestico' }
            ]
        });
        if (!articulo) {
            return res.status(404).json({ msg: 'Artículo no encontrado' });
        }
        res.json(articulo);
    }
    catch (error) {
        console.error('Error al obtener el artículo:', error);
        res.status(500).json({ msg: 'Error al obtener el artículo' });
    }
});
exports.getArticuloById = getArticuloById;
// Actualizar un artículo
const updateArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { idcategoria, idvehiculo, idelectrodomestico, estado } = req.body;
    try {
        const articulo = yield articulo_model_1.default.findByPk(id);
        if (articulo) {
            const updateData = {};
            // Verificar si la categoría asociada al artículo existe
            if (idcategoria) {
                const categoriaExistente = yield categoria_model_1.default.findByPk(idcategoria);
                if (!categoriaExistente) {
                    return res.status(400).json({ msg: 'La categoría especificada no existe' });
                }
                updateData.idcategoria = idcategoria;
            }
            // Verificar si el vehículo asociado al artículo existe
            if (idvehiculo) {
                const vehiculoExistente = yield vehiculo_model_1.default.findByPk(idvehiculo);
                if (!vehiculoExistente) {
                    return res.status(400).json({ msg: 'El vehículo especificado no existe' });
                }
                updateData.idvehiculo = idvehiculo;
            }
            // Verificar si el electrodoméstico asociado al artículo existe
            if (idelectrodomestico) {
                const electrodomesticoExistente = yield electrodometisco_model_1.default.findByPk(idelectrodomestico);
                if (!electrodomesticoExistente) {
                    return res.status(400).json({ msg: 'El electrodoméstico especificado no existe' });
                }
                updateData.idelectrodomestico = idelectrodomestico;
            }
            // Actualizar estado si está presente en el request body
            if (estado) {
                updateData.estado = estado;
            }
            // Actualizar artículo solo con los campos proporcionados
            yield articulo.update(updateData);
            res.json({ msg: 'Artículo actualizado correctamente' });
        }
        else {
            res.status(404).json({ msg: 'Artículo no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el artículo' });
    }
});
exports.updateArticulo = updateArticulo;
// Eliminar un artículo
const deleteArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idArticulo } = req.params; // El nombre de parámetro debe coincidir con el especificado en la ruta
    try {
        const articulo = yield articulo_model_1.default.findByPk(idArticulo);
        if (articulo) {
            yield articulo.destroy();
            res.json({ msg: 'Artículo eliminado correctamente' });
        }
        else {
            res.status(404).json({ msg: 'Artículo no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el artículo' });
    }
});
exports.deleteArticulo = deleteArticulo;
const getArticulosVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articulos = yield articulo_model_1.default.findAll({
            where: {
                idvehiculo: { [sequelize_1.Op.not]: null } // Filtrar artículos que tengan un vehículo asociado
            },
            include: [{ model: vehiculo_model_1.default, as: 'Vehiculo' }]
        });
        res.json(articulos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de artículos de categoría vehículo' });
    }
});
exports.getArticulosVehiculo = getArticulosVehiculo;
// Método para obtener artículos de categoría electrodoméstico
const getArticulosElectrodomestico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articulos = yield articulo_model_1.default.findAll({
            where: {
                idelectrodomestico: { [sequelize_1.Op.not]: null } // Filtrar artículos que tengan un electrodoméstico asociado
            },
            include: [{ model: electrodometisco_model_1.default, as: 'Electrodomestico' }]
        });
        res.json(articulos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de artículos de categoría electrodoméstico' });
    }
});
exports.getArticulosElectrodomestico = getArticulosElectrodomestico;
