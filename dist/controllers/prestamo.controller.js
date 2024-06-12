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
exports.getPrestamosVencidos = exports.getPrestamosPorArticuloElectrodomestico = exports.getPrestamosPorArticuloVehiculo = exports.getUltimoPrestamoIngresado = exports.getPrestamosPorEstadoDetalle = exports.deletePrestamo = exports.updatePrestamo = exports.getPrestamoById = exports.getPrestamos = exports.createPrestamo = void 0;
const prestamo_model_1 = __importDefault(require("../models/prestamo.model"));
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const articulo_model_1 = __importDefault(require("../models/articulo.model"));
const pago_model_1 = __importDefault(require("../models/pago.model"));
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const vehiculo_model_1 = __importDefault(require("../models/vehiculo.model"));
const electrodometisco_model_1 = __importDefault(require("../models/electrodometisco.model"));
const sequelize_1 = require("sequelize");
const createPrestamo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idcliente, idarticulo, fecha_prestamo, fecha_devolucion, monto_prestamo, monto_pago, estado } = req.body;
    try {
        // Verificar si el cliente, el empleado y el artículo asociados al préstamo existen
        const clienteExistente = yield cliente_model_1.default.findByPk(idcliente);
        const articuloExistente = yield articulo_model_1.default.findByPk(idarticulo);
        if (!clienteExistente || !articuloExistente) {
            return res.status(400).json({ msg: 'El cliente, el empleado o el artículo especificados no existen' });
        }
        // Verificar si el cliente tiene préstamos pendientes
        const prestamosPendientes = yield prestamo_model_1.default.findAll({
            where: {
                idcliente,
                estado: 'pendiente'
            }
        });
        if (prestamosPendientes.length > 0) {
            return res.status(400).json({ msg: 'El cliente tiene préstamos pendientes' });
        }
        const nuevoPrestamo = yield prestamo_model_1.default.create({
            idcliente,
            idarticulo,
            fecha_prestamo,
            fecha_devolucion,
            monto_prestamo,
            monto_pago,
            estado
        });
        res.status(201).json(nuevoPrestamo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el préstamo' });
    }
});
exports.createPrestamo = createPrestamo;
const getPrestamos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prestamos = yield prestamo_model_1.default.findAll({
            include: [
                { model: cliente_model_1.default, as: 'Cliente' },
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
            ],
        });
        res.json(prestamos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de préstamos' });
    }
});
exports.getPrestamos = getPrestamos;
const getPrestamoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPrestamo } = req.params;
    try {
        const prestamo = yield prestamo_model_1.default.findByPk(idPrestamo, {
            include: [
                { model: cliente_model_1.default, as: 'Cliente' },
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
            ],
        });
        if (!prestamo) {
            res.status(404).json({ msg: 'Préstamo no encontrado' });
        }
        else {
            res.json(prestamo);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el préstamo' });
    }
});
exports.getPrestamoById = getPrestamoById;
const updatePrestamo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idPrestamo } = req.params;
    try {
        const prestamo = yield prestamo_model_1.default.findByPk(idPrestamo);
        if (prestamo) {
            // Verificar si el cliente, el empleado y el artículo asociados al préstamo existen
            if (body.idcliente) {
                const clienteExistente = yield cliente_model_1.default.findByPk(body.idcliente);
                if (!clienteExistente) {
                    return res.status(400).json({ msg: 'El cliente especificado no existe' });
                }
            }
            if (body.idempleado) {
                const empleadoExistente = yield empleado_model_1.default.findByPk(body.idempleado);
                if (!empleadoExistente) {
                    return res.status(400).json({ msg: 'El empleado especificado no existe' });
                }
            }
            if (body.idarticulo) {
                const articuloExistente = yield articulo_model_1.default.findByPk(body.idarticulo);
                if (!articuloExistente) {
                    return res.status(400).json({ msg: 'El artículo especificado no existe' });
                }
            }
            yield prestamo.update(body);
            res.json({ msg: 'El préstamo fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un préstamo con el id ${idPrestamo}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el préstamo' });
    }
});
exports.updatePrestamo = updatePrestamo;
const deletePrestamo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPrestamo } = req.params;
    try {
        const prestamo = yield prestamo_model_1.default.findByPk(idPrestamo);
        if (!prestamo) {
            res.status(404).json({ msg: 'Préstamo no encontrado' });
        }
        else {
            yield prestamo.destroy();
            res.json({ msg: 'Préstamo eliminado con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el préstamo' });
    }
});
exports.deletePrestamo = deletePrestamo;
const getPrestamosPorEstadoDetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estadoDetalle } = req.params;
    try {
        // Realizar una consulta con join para obtener los préstamos basados en el estado de detalle
        const prestamos = yield prestamo_model_1.default.findAll({
            include: [
                {
                    model: pago_model_1.default,
                    as: 'DetallePrestamo',
                    where: { estado_detalle: estadoDetalle },
                },
            ],
        });
        res.json(prestamos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los préstamos por estado de detalle' });
    }
});
exports.getPrestamosPorEstadoDetalle = getPrestamosPorEstadoDetalle;
const getUltimoPrestamoIngresado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Realizar una consulta para obtener el último préstamo ingresado
        const ultimoPrestamo = yield prestamo_model_1.default.findOne({
            include: [
                { model: cliente_model_1.default, as: 'Cliente' },
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
            ],
            order: [['id', 'DESC']],
            limit: 1, // Limitar los resultados a uno
        });
        res.json(ultimoPrestamo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el último préstamo ingresado' });
    }
});
exports.getUltimoPrestamoIngresado = getUltimoPrestamoIngresado;
const getPrestamosPorArticuloVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prestamos = yield prestamo_model_1.default.findAll({
            include: [
                {
                    model: articulo_model_1.default,
                    as: 'Articulo',
                    include: [{ model: vehiculo_model_1.default, as: 'Vehiculo' }],
                    where: {
                        idvehiculo: { [sequelize_1.Op.not]: null } // Filtrar artículos que tengan un vehículo asociado
                    }
                }
            ]
        });
        res.json(prestamos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los préstamos por artículo vehículo' });
    }
});
exports.getPrestamosPorArticuloVehiculo = getPrestamosPorArticuloVehiculo;
// Obtener préstamos por artículo electrodoméstico
const getPrestamosPorArticuloElectrodomestico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prestamos = yield prestamo_model_1.default.findAll({
            include: [
                {
                    model: articulo_model_1.default,
                    as: 'Articulo',
                    include: [{ model: electrodometisco_model_1.default, as: 'Electrodomestico' }],
                    where: {
                        idelectrodomestico: { [sequelize_1.Op.not]: null } // Filtrar artículos que tengan un electrodoméstico asociado
                    }
                }
            ]
        });
        res.json(prestamos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los préstamos por artículo electrodoméstico' });
    }
});
exports.getPrestamosPorArticuloElectrodomestico = getPrestamosPorArticuloElectrodomestico;
const getPrestamosVencidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hoy = new Date(); // Obtener la fecha actual
        const prestamosVencidos = yield prestamo_model_1.default.findAll({
            where: {
                fecha_devolucion: {
                    [sequelize_1.Op.lt]: hoy // Obtener los préstamos donde la fecha de devolución es anterior a la fecha actual
                }
            },
            include: [
                { model: cliente_model_1.default, as: 'Cliente' },
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: articulo_model_1.default, as: 'Articulo',
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
        });
        res.json(prestamosVencidos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los préstamos vencidos' });
    }
});
exports.getPrestamosVencidos = getPrestamosVencidos;
