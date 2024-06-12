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
exports.deleteBoleta = exports.updateBoleta = exports.getBoletaById = exports.getBoletas = exports.createBoleta = void 0;
const boleta_model_1 = __importDefault(require("../models/boleta.model"));
const detalleventa_model_1 = __importDefault(require("../models/detalleventa.model"));
const venta_model_1 = __importDefault(require("../models/venta.model"));
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const articulo_model_1 = __importDefault(require("../models/articulo.model"));
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const vehiculo_model_1 = __importDefault(require("../models/vehiculo.model"));
const electrodometisco_model_1 = __importDefault(require("../models/electrodometisco.model"));
const createBoleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { igv, descuento, iddetalleventa } = req.body;
    try {
        // Verificar si el prestamo asociados al Pago existen
        const detalleventaExistente = yield detalleventa_model_1.default.findByPk(iddetalleventa);
        if (!detalleventaExistente) {
            return res.status(400).json({ msg: 'El DetalleVenta especificados no existen' });
        }
        const nuevoBoleta = yield boleta_model_1.default.create({
            igv,
            descuento,
            iddetalleventa,
        });
        res.status(201).json(nuevoBoleta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el Boleta' });
    }
});
exports.createBoleta = createBoleta;
const getBoletas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boletas = yield boleta_model_1.default.findAll({
            include: [
                {
                    model: detalleventa_model_1.default,
                    as: 'Detalleventa',
                    include: [
                        {
                            model: venta_model_1.default,
                            as: 'Venta',
                            include: [
                                { model: empleado_model_1.default, as: 'Empleado' },
                                { model: cliente_model_1.default, as: 'Cliente' },
                                {
                                    model: articulo_model_1.default,
                                    as: 'Articulo',
                                    include: [
                                        {
                                            model: categoria_model_1.default,
                                            as: 'Categoria'
                                        },
                                        {
                                            model: vehiculo_model_1.default,
                                            as: 'Vehiculo'
                                        },
                                        {
                                            model: electrodometisco_model_1.default,
                                            as: 'Electrodomestico'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json(boletas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Boletas' });
    }
});
exports.getBoletas = getBoletas;
const getBoletaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idBoleta } = req.params;
    try {
        const boleta = yield boleta_model_1.default.findByPk(idBoleta, {
            include: [
                { model: detalleventa_model_1.default, as: 'DetalleVenta' }
            ],
        });
        if (!boleta) {
            res.status(404).json({ msg: 'Boleta no encontrado' });
        }
        else {
            res.json(boleta);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el Boleta' });
    }
});
exports.getBoletaById = getBoletaById;
const updateBoleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idBoleta } = req.params;
    try {
        const boleta = yield boleta_model_1.default.findByPk(idBoleta);
        if (boleta) {
            // Verificar si el prestamo asociados al préstamo existen
            if (body.iddetalleventa) {
                const detalleventaExistente = yield boleta_model_1.default.findByPk(body.iddetalleventa);
                if (!detalleventaExistente) {
                    return res.status(400).json({ msg: 'El detalleventa especificado no existe' });
                }
            }
            yield boleta.update(body);
            res.json({ msg: 'El boleta fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un boleta con el id ${idBoleta}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el Boleta' });
    }
});
exports.updateBoleta = updateBoleta;
const deleteBoleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idBoleta } = req.params;
    try {
        const boleta = yield boleta_model_1.default.findByPk(idBoleta);
        if (!boleta) {
            res.status(404).json({ msg: 'Boleta no encontrado' });
        }
        else {
            yield boleta.destroy();
            res.json({ msg: 'Boleta eliminado con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el Boleta' });
    }
});
exports.deleteBoleta = deleteBoleta;
