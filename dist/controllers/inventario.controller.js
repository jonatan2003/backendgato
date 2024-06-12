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
exports.deleteInventario = exports.updateInventario = exports.getInventarioById = exports.getInventarios = exports.createInventario = void 0;
const inventario_model_1 = __importDefault(require("../models/inventario.model"));
const articulo_model_1 = __importDefault(require("../models/articulo.model"));
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const vehiculo_model_1 = __importDefault(require("../models/vehiculo.model"));
const electrodometisco_model_1 = __importDefault(require("../models/electrodometisco.model"));
const createInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idarticulo, stock, estado_articulo, valor_venta, valor_precio } = req.body;
    try {
        // Verificar si el artículo asociado al inventario existe
        const articuloExistente = yield articulo_model_1.default.findByPk(idarticulo);
        if (!articuloExistente) {
            return res.status(400).json({ msg: 'El artículo especificado no existe' });
        }
        const nuevoInventario = yield inventario_model_1.default.create({
            idarticulo,
            stock,
            estado_articulo,
            valor_venta,
            valor_precio,
        });
        res.status(201).json(nuevoInventario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el inventario' });
    }
});
exports.createInventario = createInventario;
const getInventarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventarios = yield inventario_model_1.default.findAll({
            include: [
                { model: articulo_model_1.default, as: 'Articulo',
                    include: [
                        { model: categoria_model_1.default, as: 'Categoria' },
                        { model: vehiculo_model_1.default, as: 'Vehiculo' },
                        { model: electrodometisco_model_1.default, as: 'Electrodomestico' }
                    ],
                },
            ],
        });
        res.json(inventarios);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de inventarios' });
    }
});
exports.getInventarios = getInventarios;
const getInventarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const inventario = yield inventario_model_1.default.findByPk(id, {
            include: [
                { model: articulo_model_1.default, as: 'Articulo',
                    include: [
                        { model: categoria_model_1.default, as: 'Categoria' },
                        { model: vehiculo_model_1.default, as: 'Vehiculo' },
                        { model: electrodometisco_model_1.default, as: 'Electrodomestico' }
                    ],
                },
            ],
        });
        if (!inventario) {
            res.status(404).json({ msg: 'Inventario no encontrado' });
        }
        else {
            res.json(inventario);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el inventario' });
    }
});
exports.getInventarioById = getInventarioById;
const updateInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const inventario = yield inventario_model_1.default.findByPk(id);
        if (inventario) {
            if (body.idarticulo) {
                const articuloExistente = yield articulo_model_1.default.findByPk(body.idarticulo);
                if (!articuloExistente) {
                    return res.status(400).json({ msg: 'El artículo especificado no existe' });
                }
            }
            yield inventario.update(body);
            res.json({ msg: 'El inventario fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un inventario con el id ${id}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el inventario' });
    }
});
exports.updateInventario = updateInventario;
const deleteInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const inventario = yield inventario_model_1.default.findByPk(id);
        if (!inventario) {
            res.status(404).json({ msg: 'Inventario no encontrado' });
        }
        else {
            yield inventario.destroy();
            res.json({ msg: 'Inventario eliminado con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el inventario' });
    }
});
exports.deleteInventario = deleteInventario;
