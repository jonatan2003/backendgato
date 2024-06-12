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
exports.getPrestamosPagados = exports.getPrestamosPendientes = exports.getCronogramaPagosPendientes = exports.getPrestamosVenta = exports.getTicketsPrestamosPendientes = exports.actualizarPrestamosAVenta = exports.getUsuarios = exports.getDetallesVenta = exports.getVentas = exports.getCategorias = exports.getPagos = exports.getTiposPago = exports.getTickets = exports.getTicketsPrestamos = exports.getTicketsPagos = exports.getTicketsVentas = exports.getComprobantesVenta = exports.getInventario = exports.getElectrodomesticos = exports.getVehiculos = exports.getArticulos = exports.getEmpleados = exports.getPrestamos = exports.getClientesRUC = exports.getClientesDNI = exports.getClientes = void 0;
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const prestamo_model_1 = __importDefault(require("../models/prestamo.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const articulo_model_1 = __importDefault(require("../models/articulo.model"));
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const vehiculo_model_1 = __importDefault(require("../models/vehiculo.model"));
const electrodometisco_model_1 = __importDefault(require("../models/electrodometisco.model"));
const venta_model_1 = __importDefault(require("../models/venta.model"));
const detalleventa_model_1 = __importDefault(require("../models/detalleventa.model"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const pago_model_1 = __importDefault(require("../models/pago.model"));
const sequelize_1 = require("sequelize");
const server_1 = __importDefault(require("../server"));
const inventario_model_1 = __importDefault(require("../models/inventario.model"));
const comprobante_venta_model_1 = __importDefault(require("../models/comprobante_venta.model"));
const tipo_comprobante_model_1 = __importDefault(require("../models/tipo_comprobante.model"));
const ticket_model_1 = __importDefault(require("../models/ticket.model"));
const tipo_pago_model_1 = __importDefault(require("../models/tipo_pago.model"));
const cronograma_pagos_model_1 = __importDefault(require("../models/cronograma_pagos.model"));
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1; // Página solicitada (predeterminada: 1)
        const pageSize = parseInt(req.query.pageSize, 10) || 10; // Tamaño de página (predeterminado: 10)
        const offset = (page - 1) * pageSize;
        // Consulta para obtener clientes paginados
        const clientes = yield cliente_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
        });
        const totalItems = clientes.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: clientes.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de clientes' });
    }
});
exports.getClientes = getClientes;
const getClientesDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1; // Página solicitada (predeterminada: 1)
        const pageSize = parseInt(req.query.pageSize, 10) || 10; // Tamaño de página (predeterminado: 10)
        const offset = (page - 1) * pageSize;
        // Consulta para obtener clientes paginados con ruc igual a "no"
        const clientes = yield cliente_model_1.default.findAndCountAll({
            where: {
                ruc: 'no'
            },
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
        });
        const totalItems = clientes.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: clientes.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de clientes' });
    }
});
exports.getClientesDNI = getClientesDNI;
// Obtener clientes que tienen dni igual a "no"
const getClientesRUC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1; // Página solicitada (predeterminada: 1)
        const pageSize = parseInt(req.query.pageSize, 10) || 10; // Tamaño de página (predeterminado: 10)
        const offset = (page - 1) * pageSize;
        const clientes = yield cliente_model_1.default.findAndCountAll({
            where: {
                dni: 'no'
            },
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
        });
        const totalItems = clientes.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: clientes.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de clientes' });
    }
});
exports.getClientesRUC = getClientesRUC;
const getPrestamos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        const prestamos = yield prestamo_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
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
        const totalItems = prestamos.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: prestamos.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de préstamos' });
    }
});
exports.getPrestamos = getPrestamos;
// Método de paginación para empleados
const getEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        const empleados = yield empleado_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
        });
        const totalItems = empleados.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: empleados.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de empleados' });
    }
});
exports.getEmpleados = getEmpleados;
// export const getArticulos = async (req: Request, res: Response) => {
//   try {
//     const page = parseInt(req.query.page as string, 10) || 1;
//     const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
//     const offset = (page - 1) * pageSize;
//     const categoriaId = req.params.categoriaId;
//     // Consulta para obtener artículos paginados según el tipo de categoría
//     let consulta;
//     if (categoriaId === '1') { // Si la categoría es 1, contar vehículos
//       consulta = Vehiculo.findAndCountAll({ limit: pageSize, offset: offset,
//         order: [['id', 'DESC']],
//        });
//     } else if (categoriaId === '2') { // Si la categoría es 2, contar electrodomésticos
//       consulta = Electrodomestico.findAndCountAll({ limit: pageSize, offset: offset ,
//         order: [['id', 'DESC']],
//       });
//     } else { // Por defecto, contar todos los artículos
//       consulta = Articulo.findAndCountAll({ limit: pageSize, offset: offset,
//         order: [['id', 'DESC']],
//         include: [
//           { model: Categoria, as: 'Categoria' },
//           { model: Vehiculo, as: 'Vehiculo' },
//           { model: Electrodomestico, as: 'Electrodomestico' }
//         ]
//        });
//     }
//     const articulos = await consulta;
//     const totalItems = articulos.count;
//     const totalPages = Math.ceil(totalItems / pageSize);
//     res.json({
//       page,
//       pageSize,
//       totalItems,
//       totalPages,
//       data: articulos.rows,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: 'Error al obtener la lista de artículos' });
//   }
// };
const getArticulos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        const categoriaId = req.params.categoriaId;
        let consulta;
        if (categoriaId === '1') {
            // Consulta para obtener artículos (vehículos) paginados con detalles de Vehiculo
            consulta = articulo_model_1.default.findAndCountAll({
                where: { idvehiculo: { [sequelize_1.Op.not]: null } },
                limit: pageSize,
                offset: offset,
                order: [['id', 'DESC']],
                include: [
                    { model: categoria_model_1.default, as: 'Categoria' },
                    { model: vehiculo_model_1.default, as: 'Vehiculo' },
                ],
            });
        }
        else if (categoriaId === '2') {
            // Consulta para obtener artículos (electrodomésticos) paginados con detalles de Electrodomestico
            consulta = articulo_model_1.default.findAndCountAll({
                where: { idelectrodomestico: { [sequelize_1.Op.not]: null } },
                limit: pageSize,
                offset: offset,
                order: [['id', 'DESC']],
                include: [
                    { model: categoria_model_1.default, as: 'Categoria' },
                    { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                ],
            });
        }
        else {
            // Consulta para obtener todos los artículos paginados con detalles de Vehiculo o Electrodomestico según corresponda
            consulta = articulo_model_1.default.findAndCountAll({
                limit: pageSize,
                offset: offset,
                order: [['id', 'DESC']],
                include: [
                    { model: categoria_model_1.default, as: 'Categoria' },
                    { model: vehiculo_model_1.default, as: 'Vehiculo' },
                    { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                ],
            });
        }
        const articulos = yield consulta;
        const totalItems = articulos.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: articulos.rows,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de artículos' });
    }
});
exports.getArticulos = getArticulos;
// Método de paginación para Vehículo
const getVehiculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        const vehiculos = yield vehiculo_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
        });
        const totalItems = vehiculos.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: vehiculos.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de vehículos' });
    }
});
exports.getVehiculos = getVehiculos;
// Método de paginación para Electrodoméstico
const getElectrodomesticos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        const electrodomesticos = yield electrodometisco_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
        });
        const totalItems = electrodomesticos.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: electrodomesticos.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de electrodomésticos' });
    }
});
exports.getElectrodomesticos = getElectrodomesticos;
const getInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parámetros de paginación
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        // Consulta principal con la paginación y las relaciones
        const inventarios = yield inventario_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
            include: [
                {
                    model: articulo_model_1.default, as: 'Articulo', include: [
                        { model: categoria_model_1.default, as: 'Categoria' },
                        { model: vehiculo_model_1.default, as: 'Vehiculo' },
                        { model: electrodometisco_model_1.default, as: 'Electrodomestico' }
                    ],
                },
            ],
        });
        // Calcular información de paginación
        const totalItems = inventarios.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        // Enviar respuesta con los datos y la información de paginación
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: inventarios.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de inventarios' });
    }
});
exports.getInventario = getInventario;
const getComprobantesVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const comprobantesVenta = yield comprobante_venta_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
            include: [
                {
                    model: tipo_comprobante_model_1.default,
                    as: 'TipoComprobante'
                },
                {
                    model: venta_model_1.default,
                    as: 'Venta',
                    include: [
                        {
                            model: empleado_model_1.default,
                            as: 'Empleado'
                        },
                        {
                            model: cliente_model_1.default,
                            as: 'Cliente'
                        },
                    ],
                },
            ],
        });
        // Calcular información de paginación
        const totalItems = comprobantesVenta.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        // Enviar respuesta con los datos y la información de paginación
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: comprobantesVenta.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Comprobantes de Venta' });
    }
});
exports.getComprobantesVenta = getComprobantesVenta;
const getTicketsVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parámetros de paginación
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        // Consulta principal con la paginación y las relaciones
        const tickets = yield ticket_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: pago_model_1.default, as: 'Pago' },
                {
                    model: prestamo_model_1.default, as: 'Prestamo', where: { estado: 'vencido' },
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        {
                            model: articulo_model_1.default, as: 'Articulo', include: [
                                { model: categoria_model_1.default, as: 'Categoria' },
                                { model: vehiculo_model_1.default, as: 'Vehiculo' },
                                { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                            ]
                        },
                    ],
                }
            ],
        });
        // Calcular información de paginación
        const totalItems = tickets.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        // Enviar respuesta con los datos y la información de paginación
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: tickets.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Tickets' });
    }
});
exports.getTicketsVentas = getTicketsVentas;
const getTicketsPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parámetros de paginación
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        // Consulta principal con la paginación y las relaciones
        const tickets = yield ticket_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                {
                    model: pago_model_1.default, as: 'Pago', where: { '$Pago.idPrestamo$': { [sequelize_1.Op.col]: 'Ticket.idPrestamo' } }
                },
                {
                    model: prestamo_model_1.default, as: 'Prestamo', include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        {
                            model: articulo_model_1.default, as: 'Articulo', include: [
                                { model: categoria_model_1.default, as: 'Categoria' },
                                { model: vehiculo_model_1.default, as: 'Vehiculo' },
                                { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                            ]
                        },
                    ],
                }
            ],
        });
        // Calcular información de paginación
        const totalItems = tickets.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        // Enviar respuesta con los datos y la información de paginación
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: tickets.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Tickets' });
    }
});
exports.getTicketsPagos = getTicketsPagos;
const getTicketsPrestamos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parámetros de paginación
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        // Consulta principal con la paginación y las relaciones
        const tickets = yield ticket_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
            where: {
                [sequelize_1.Op.and]: [
                    { '$Prestamo.id$': { [sequelize_1.Op.ne]: null } },
                    { '$Pago.id$': null } // Solo incluir tickets sin pago
                ]
            },
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: pago_model_1.default, as: 'Pago' },
                {
                    model: prestamo_model_1.default, as: 'Prestamo', include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        {
                            model: articulo_model_1.default, as: 'Articulo', include: [
                                { model: categoria_model_1.default, as: 'Categoria' },
                                { model: vehiculo_model_1.default, as: 'Vehiculo' },
                                { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                            ]
                        },
                    ],
                }
            ],
        });
        // Calcular información de paginación
        const totalItems = tickets.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        // Enviar respuesta con los datos y la información de paginación
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: tickets.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Tickets' });
    }
});
exports.getTicketsPrestamos = getTicketsPrestamos;
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parámetros de paginación
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        // Consulta principal con la paginación y las relaciones
        const tickets = yield ticket_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: pago_model_1.default, as: 'Pago',
                    include: [
                        { model: tipo_pago_model_1.default, as: 'TipoPago',
                        },
                    ],
                },
                {
                    model: prestamo_model_1.default, as: 'Prestamo', include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        {
                            model: articulo_model_1.default, as: 'Articulo', include: [
                                { model: categoria_model_1.default, as: 'Categoria' },
                                { model: vehiculo_model_1.default, as: 'Vehiculo' },
                                { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                            ]
                        },
                    ],
                }
            ],
        });
        // Calcular información de paginación
        const totalItems = tickets.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        // Enviar respuesta con los datos y la información de paginación
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: tickets.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Tickets' });
    }
});
exports.getTickets = getTickets;
const getTiposPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parse pagination parameters from request query
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        // Calculate offset
        const offset = (page - 1) * pageSize;
        // Fetch tiposPago with pagination
        const tiposPago = yield tipo_pago_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
        });
        // Calculate total pages
        const totalPages = Math.ceil(tiposPago.count / pageSize);
        // Send paginated response
        res.json({
            page,
            pageSize,
            totalItems: tiposPago.count,
            totalPages,
            data: tiposPago.rows,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de tipos de pago' });
    }
});
exports.getTiposPago = getTiposPago;
// Método de paginación para DetallePrestamo
const getPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1; // Página solicitada (predeterminada: 1)
        const pageSize = parseInt(req.query.pageSize, 10) || 10; // Tamaño de página (predeterminado: 10)
        const offset = (page - 1) * pageSize;
        // Consulta para obtener pagos paginados
        const pagos = yield pago_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
            include: [
                { model: prestamo_model_1.default, as: 'Prestamo',
                    include: [{ model: cliente_model_1.default, as: 'Cliente' },
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
                        }
                    ]
                }
            ],
        });
        const totalItems = pagos.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: pagos.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de pagos' });
    }
});
exports.getPagos = getPagos;
// Método de paginación para Categoria
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        const categorias = yield categoria_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
        });
        const totalItems = categorias.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: categorias.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de categorías' });
    }
});
exports.getCategorias = getCategorias;
// Método de paginación para Venta
const getVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        const ventas = yield venta_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: cliente_model_1.default, as: 'Cliente' },
            ],
        });
        const totalItems = ventas.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: ventas.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de ventas' });
    }
});
exports.getVentas = getVentas;
// Método de paginación para DetalleVenta
const getDetallesVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        const detallesVenta = yield detalleventa_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
            include: [
                { model: venta_model_1.default, as: 'Venta',
                    include: [
                        { model: empleado_model_1.default, as: 'Empleado' },
                        { model: cliente_model_1.default, as: 'Cliente' },
                    ],
                },
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
        const totalItems = detallesVenta.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: detallesVenta.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de detalles de venta' });
    }
});
exports.getDetallesVenta = getDetallesVenta;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        const usuarios = yield usuario_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
        });
        const totalItems = usuarios.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: usuarios.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de usuarios' });
    }
});
exports.getUsuarios = getUsuarios;
const actualizarPrestamosAVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hoy = new Date();
        // Obtener los IDs de los préstamos vencidos y pendientes
        const prestamosPendientes = yield prestamo_model_1.default.findAll({
            where: {
                estado: 'pendiente',
                fecha_devolucion: {
                    [sequelize_1.Op.lt]: hoy
                }
            }
        });
        const prestamosIds = prestamosPendientes.map((prestamo) => prestamo.id);
        // Actualizar los préstamos vencidos y pendientes a estado 'venta'
        const [prestamosActualizadosCount] = yield prestamo_model_1.default.update({ estado: 'vencido' }, {
            where: {
                id: {
                    [sequelize_1.Op.in]: prestamosIds
                }
            }
        });
        console.log('Préstamos actualizados:', prestamosActualizadosCount); // Verificar el conteo de préstamos actualizados
        if (prestamosActualizadosCount > 0) {
            // Obtener los detalles de los préstamos actualizados
            const prestamosActualizadosDetails = yield prestamo_model_1.default.findAll({
                where: {
                    id: {
                        [sequelize_1.Op.in]: prestamosIds
                    }
                },
                include: [
                    {
                        model: articulo_model_1.default,
                        as: 'Articulo',
                        include: [
                            { model: vehiculo_model_1.default, as: 'Vehiculo' },
                            { model: electrodometisco_model_1.default, as: 'Electrodomestico' }
                        ]
                    },
                    { model: cliente_model_1.default, as: 'Cliente' },
                ]
            });
            console.log('Detalles de préstamos actualizados:', prestamosActualizadosDetails); // Verificar los detalles de los préstamos actualizados
            const io = server_1.default.getIO(); // Obtener la instancia de io desde la instancia de Server
            // Emitir un evento para cada préstamo actualizado y actualizar artículos e inventarios
            for (const prestamo of prestamosActualizadosDetails) {
                const { id, estado, Articulo, Cliente, monto_prestamo } = prestamo.dataValues;
                let articuloDescripcion = 'No disponible';
                if (Articulo) {
                    if (Articulo.Vehiculo) {
                        articuloDescripcion = Articulo.Vehiculo.descripcion || 'No hay descripción de vehículo disponible';
                    }
                    else if (Articulo.Electrodomestico) {
                        articuloDescripcion = Articulo.Electrodomestico.descripcion || 'No hay descripción de electrodoméstico disponible';
                    }
                }
                const clienteNombre = Cliente ? Cliente.nombre : 'No disponible';
                const mensaje = `Se ha actualizado el préstamo a estado "venta" - Detalles del artículo: ${articuloDescripcion}`;
                const evento = {
                    id: id,
                    estado: estado,
                    cliente: clienteNombre,
                };
                io.emit('prestamoActualizado', { message: mensaje, prestamo: evento });
                console.log('Evento emitido para préstamo actualizado:', evento); // Verificar el evento emitido
                // Actualizar el estado del artículo a 'inventario'
                if (Articulo) {
                    yield Articulo.update({ estado: 'inventario' }, { where: { id: Articulo.id } });
                    // Calcular valor_venta como un 50% más que monto_prestamo
                    const valor_venta = monto_prestamo * 1.5;
                    // Insertar el artículo en inventarios
                    yield inventario_model_1.default.create({
                        idarticulo: Articulo.id,
                        stock: 1,
                        estado_articulo: 'disponible',
                        valor_venta: valor_venta,
                        valor_precio: monto_prestamo
                    });
                    console.log(`Artículo ${Articulo.id} actualizado a inventario y añadido a inventarios.`);
                }
            }
            res.status(200).json({ success: true, message: 'Se han actualizado los préstamos a estado "venta" correctamente.' });
        }
        else {
            res.status(404).json({ success: false, message: 'No se encontraron préstamos vencidos y pendientes para actualizar.' });
        }
    }
    catch (error) {
        console.error('Error al actualizar préstamos a estado "venta":', error);
        res.status(500).json({ success: false, message: 'Error al actualizar préstamos a estado "venta".' });
    }
});
exports.actualizarPrestamosAVenta = actualizarPrestamosAVenta;
// async function obtenerDescripcionArticulo(articulo: any): Promise<string> {
//   if (!articulo) {
//     return 'No hay descripción disponible';
//   }
//   const { idvehiculo, idelectrodomestico } = articulo.dataValues;
//   if (idvehiculo !== null) {
//     return await obtenerDescripcionVehiculo(idvehiculo);
//   } else if (idelectrodomestico !== null) {
//     return await obtenerDescripcionElectrodomestico(idelectrodomestico);
//   } else {
//     return 'No hay descripción disponible';
//   }
// }
// async function obtenerDescripcionVehiculo(idVehiculo: number): Promise<string> {
//   try {
//     const vehiculo:any = await Vehiculo.findByPk(idVehiculo); // Busca el vehículo por su ID
//     if (vehiculo) {
//       return vehiculo.descripcion || 'No hay descripción de vehículo disponible';
//     } else {
//       return 'No hay descripción de vehículo disponible';
//     }
//   } catch (error) {
//     console.error('Error al obtener la descripción del vehículo:', error);
//     return 'Error al obtener la descripción del vehículo';
//   }
// }
// async function obtenerDescripcionElectrodomestico(idElectrodomestico: number): Promise<string> {
//   try {
//     const electrodomestico:any = await Electrodomestico.findByPk(idElectrodomestico); // Busca el electrodoméstico por su ID
//     if (electrodomestico) {
//       return electrodomestico.descripcion || 'No hay descripción de electrodoméstico disponible';
//     } else {
//       return 'No hay descripción de electrodoméstico disponible';
//     }
//   } catch (error) {
//     console.error('Error al obtener la descripción del electrodoméstico:', error);
//     return 'Error al obtener la descripción del electrodoméstico';
//   }
// }
const getTicketsPrestamosPendientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parámetros de paginación
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        // Consulta principal con la paginación y las relaciones
        const tickets = yield ticket_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: pago_model_1.default, as: 'Pago' },
                {
                    model: prestamo_model_1.default, as: 'Prestamo', where: { estado: 'pendiente' },
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        {
                            model: articulo_model_1.default, as: 'Articulo', include: [
                                { model: categoria_model_1.default, as: 'Categoria' },
                                { model: vehiculo_model_1.default, as: 'Vehiculo' },
                                { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                            ]
                        },
                    ],
                }
            ],
        });
        // Calcular información de paginación
        const totalItems = tickets.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        // Enviar respuesta con los datos y la información de paginación
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: tickets.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Tickets' });
    }
});
exports.getTicketsPrestamosPendientes = getTicketsPrestamosPendientes;
const getPrestamosVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        // Realiza la consulta paginada para obtener los préstamos en estado 'venta'
        const prestamosVenta = yield prestamo_model_1.default.findAndCountAll({
            where: {
                estado: 'vencido'
            },
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
            include: [
                { model: cliente_model_1.default, as: 'Cliente' },
                {
                    model: articulo_model_1.default,
                    as: 'Articulo',
                    include: [
                        { model: categoria_model_1.default, as: 'Categoria' },
                        { model: vehiculo_model_1.default, as: 'Vehiculo' },
                        { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                    ],
                },
            ]
        });
        const totalItems = prestamosVenta.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: prestamosVenta.rows
        });
    }
    catch (error) {
        console.error('Error al obtener préstamos en estado "venta" con paginación:', error);
        res.status(500).json({ success: false, message: 'Error al obtener préstamos en estado "venta" con paginación.' });
    }
});
exports.getPrestamosVenta = getPrestamosVenta;
const getCronogramaPagosPendientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        // Realiza la consulta paginada para obtener los cronogramas de pagos con préstamos en estado 'pendiente'
        const cronogramaPagosPendientes = yield cronograma_pagos_model_1.default.findAndCountAll({
            include: [
                {
                    model: prestamo_model_1.default,
                    as: 'Prestamo',
                    where: { estado: 'pendiente' },
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        {
                            model: articulo_model_1.default,
                            as: 'Articulo',
                            include: [
                                { model: categoria_model_1.default, as: 'Categoria' },
                                { model: vehiculo_model_1.default, as: 'Vehiculo' },
                                { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                            ],
                        },
                    ],
                },
            ],
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
        });
        const totalItems = cronogramaPagosPendientes.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: cronogramaPagosPendientes.rows,
        });
    }
    catch (error) {
        console.error('Error al obtener cronogramas de pagos con préstamos en estado "pendiente" con paginación:', error);
        res.status(500).json({ success: false, message: 'Error al obtener cronogramas de pagos con préstamos en estado "pendiente" con paginación.' });
    }
});
exports.getCronogramaPagosPendientes = getCronogramaPagosPendientes;
const getPrestamosPendientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parámetros de paginación
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        // Consulta principal con la paginación y las relaciones
        const tickets = yield ticket_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: pago_model_1.default, as: 'Pago' },
                {
                    model: prestamo_model_1.default, as: 'Prestamo', where: { estado: 'pendiente' },
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        {
                            model: articulo_model_1.default, as: 'Articulo', include: [
                                { model: categoria_model_1.default, as: 'Categoria' },
                                { model: vehiculo_model_1.default, as: 'Vehiculo' },
                                { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                            ]
                        },
                    ],
                }
            ],
        });
        // Calcular información de paginación
        const totalItems = tickets.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        // Enviar respuesta con los datos y la información de paginación
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: tickets.rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Tickets' });
    }
});
exports.getPrestamosPendientes = getPrestamosPendientes;
const getPrestamosPagados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;
        const prestamosPendientes = yield prestamo_model_1.default.findAndCountAll({
            where: {
                estado: 'pagado', // Filtrar por préstamos con estado "pendiente"
            },
            include: [
                { model: cliente_model_1.default, as: 'Cliente' },
                { model: empleado_model_1.default, as: 'Empleado' },
                {
                    model: articulo_model_1.default,
                    as: 'Articulo',
                    include: [
                        { model: categoria_model_1.default, as: 'Categoria' },
                        { model: vehiculo_model_1.default, as: 'Vehiculo' },
                        { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                    ],
                },
            ],
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']], // Ordenar por fecha de creación en orden descendente (o usar otro campo relevante)
        });
        const totalItems = prestamosPendientes.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: prestamosPendientes.rows,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los préstamos pagados' });
    }
});
exports.getPrestamosPagados = getPrestamosPagados;
