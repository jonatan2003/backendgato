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
exports.deleteCronogramaPago = exports.updateCronogramaPago = exports.getCronogramaPagoByIdPrestamo = exports.getCronogramaPagos = exports.createCronogramaPago = void 0;
const cronograma_pagos_model_1 = __importDefault(require("../models/cronograma_pagos.model"));
const prestamo_model_1 = __importDefault(require("../models/prestamo.model"));
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const articulo_model_1 = __importDefault(require("../models/articulo.model"));
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const vehiculo_model_1 = __importDefault(require("../models/vehiculo.model"));
const electrodometisco_model_1 = __importDefault(require("../models/electrodometisco.model"));
const createCronogramaPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_prestamo, fecha_pago, monto_pagado } = req.body;
    try {
        const nuevoPago = yield cronograma_pagos_model_1.default.create({
            id_prestamo,
            fecha_pago,
            monto_pagado,
        });
        res.status(201).json(nuevoPago);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el pago' });
    }
});
exports.createCronogramaPago = createCronogramaPago;
const getCronogramaPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagos = yield cronograma_pagos_model_1.default.findAll({
            include: [
                {
                    model: prestamo_model_1.default,
                    as: 'Prestamo',
                    include: [
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
                                },
                            ]
                        },
                    ],
                }
            ],
        });
        res.json(pagos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de pagos' });
    }
});
exports.getCronogramaPagos = getCronogramaPagos;
const getCronogramaPagoByIdPrestamo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_prestamo } = req.params;
    try {
        const pagos = yield cronograma_pagos_model_1.default.findAll({
            include: [
                {
                    model: prestamo_model_1.default,
                    as: 'Prestamo',
                    include: [
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
                                },
                            ]
                        },
                    ],
                }
            ],
            where: { id_prestamo }
        });
        if (!pagos.length) {
            res.status(404).json({ msg: 'Pagos no encontrados para el préstamo especificado' });
        }
        else {
            res.json(pagos);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los pagos' });
    }
});
exports.getCronogramaPagoByIdPrestamo = getCronogramaPagoByIdPrestamo;
const updateCronogramaPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const pago = yield cronograma_pagos_model_1.default.findByPk(id);
        if (pago) {
            yield pago.update(body);
            res.json({ msg: 'El pago fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un pago con el id ${id}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el pago' });
    }
});
exports.updateCronogramaPago = updateCronogramaPago;
const deleteCronogramaPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pago = yield cronograma_pagos_model_1.default.findByPk(id);
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
        res.status(500).json({ msg: 'Error al eliminar el pago' });
    }
});
exports.deleteCronogramaPago = deleteCronogramaPago;
