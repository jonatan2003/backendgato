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
exports.getDetallesVenta = exports.deleteDetalleVenta = exports.updateDetalleVenta = exports.getDetalleVentaByVentaId = exports.getDetalleVentaById = exports.createDetalleVenta = void 0;
const detalleventa_model_1 = __importDefault(require("../models/detalleventa.model"));
const venta_model_1 = __importDefault(require("../models/venta.model"));
const articulo_model_1 = __importDefault(require("../models/articulo.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const vehiculo_model_1 = __importDefault(require("../models/vehiculo.model"));
const electrodometisco_model_1 = __importDefault(require("../models/electrodometisco.model"));
const createDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detallesVenta = req.body; // Se espera un array de detalles de venta
    try {
        // Itera sobre cada detalle de venta y créalo en la base de datos
        const nuevosDetallesVenta = yield Promise.all(detallesVenta.map((detalle) => __awaiter(void 0, void 0, void 0, function* () {
            const nuevoDetalleVenta = yield detalleventa_model_1.default.create({
                idventa: detalle.idventa,
                idarticulo: detalle.idarticulo,
                cantidad: detalle.cantidad,
                precio_unitario: detalle.precio_unitario,
                subtotal: detalle.subtotal,
                // Otras propiedades del detalle de venta, si las hay
            });
            return nuevoDetalleVenta;
        })));
        res.status(201).json(nuevosDetallesVenta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear los detalles de venta' });
    }
});
exports.createDetalleVenta = createDetalleVenta;
const getDetalleVentaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idDetalleVenta } = req.params;
    try {
        const detalleVenta = yield detalleventa_model_1.default.findByPk(idDetalleVenta, {
            include: [
                { model: articulo_model_1.default, as: 'Articulo',
                    include: [
                        {
                            model: categoria_model_1.default,
                            as: 'Categoria' // Alias para la relación de Artículo
                        },
                        {
                            model: vehiculo_model_1.default,
                            as: 'Vehiculo' // Alias para la relación de Artículo
                        },
                        {
                            model: electrodometisco_model_1.default,
                            as: 'Electrodomestico' // Alias para la relación de Artículo
                        },
                    ]
                },
                { model: venta_model_1.default, as: 'Venta',
                    include: [
                        { model: empleado_model_1.default, as: 'Empleado' },
                        { model: cliente_model_1.default, as: 'Cliente' },
                    ],
                },
            ],
        });
        if (!detalleVenta) {
            res.status(404).json({ msg: 'Detalle de venta no encontrado' });
        }
        else {
            res.json(detalleVenta);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el detalle de venta' });
    }
});
exports.getDetalleVentaById = getDetalleVentaById;
const getDetalleVentaByVentaId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idVenta } = req.params;
    try {
        const detallesVenta = yield detalleventa_model_1.default.findAll({
            where: { idVenta },
            include: [
                { model: articulo_model_1.default, as: 'Articulo',
                    include: [
                        {
                            model: categoria_model_1.default,
                            as: 'Categoria' // Alias para la relación de Artículo
                        },
                        {
                            model: vehiculo_model_1.default,
                            as: 'Vehiculo' // Alias para la relación de Artículo
                        },
                        {
                            model: electrodometisco_model_1.default,
                            as: 'Electrodomestico' // Alias para la relación de Artículo
                        },
                    ]
                },
                { model: venta_model_1.default, as: 'Venta',
                    include: [
                        { model: empleado_model_1.default, as: 'Empleado' },
                        { model: cliente_model_1.default, as: 'Cliente' },
                    ],
                },
            ],
        });
        if (!detallesVenta || detallesVenta.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron detalles de venta para la idVenta proporcionada' });
        }
        else {
            return res.json(detallesVenta);
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al obtener los detalles de venta' });
    }
});
exports.getDetalleVentaByVentaId = getDetalleVentaByVentaId;
const updateDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idDetalleVenta } = req.params;
    try {
        const detalleVenta = yield detalleventa_model_1.default.findByPk(idDetalleVenta);
        if (detalleVenta) {
            yield detalleVenta.update(body);
            res.json({ msg: 'El detalle de venta fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un detalle de venta con el id ${idDetalleVenta}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el detalle de venta' });
    }
});
exports.updateDetalleVenta = updateDetalleVenta;
const deleteDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idDetalleVenta } = req.params;
    try {
        const detalleVenta = yield detalleventa_model_1.default.findByPk(idDetalleVenta);
        if (!detalleVenta) {
            res.status(404).json({ msg: 'Detalle de venta no encontrado' });
        }
        else {
            yield detalleVenta.destroy();
            res.json({ msg: 'Detalle de venta eliminado con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el detalle de venta' });
    }
});
exports.deleteDetalleVenta = deleteDetalleVenta;
const getDetallesVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detallesVenta = yield detalleventa_model_1.default.findAll({
            include: [
                { model: articulo_model_1.default, as: 'Articulo',
                    include: [
                        {
                            model: categoria_model_1.default,
                            as: 'Categoria' // Alias para la relación de Artículo
                        },
                        {
                            model: vehiculo_model_1.default,
                            as: 'Vehiculo' // Alias para la relación de Artículo
                        },
                        {
                            model: electrodometisco_model_1.default,
                            as: 'Electrodomestico' // Alias para la relación de Artículo
                        },
                    ]
                },
                { model: venta_model_1.default, as: 'Venta',
                    include: [
                        { model: empleado_model_1.default, as: 'Empleado' },
                        { model: cliente_model_1.default, as: 'Cliente' },
                    ],
                },
            ],
        });
        res.json(detallesVenta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de detalles de venta' });
    }
});
exports.getDetallesVenta = getDetallesVenta;
