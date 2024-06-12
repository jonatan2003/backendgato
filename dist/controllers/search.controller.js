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
exports.searchCronogramaPagos = exports.searchDetallesVenta = exports.searchVentas = exports.searchPagos = exports.searchUsuarios = exports.searchCategorias = exports.searchPrestamos = exports.searchTicketsPrestamos = exports.searchInventario = exports.searchArticulos = exports.searchEmpleados = exports.searchClientes = void 0;
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const sequelize_1 = require("sequelize"); // Agregar esta línea
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const articulo_model_1 = __importDefault(require("../models/articulo.model"));
const prestamo_model_1 = __importDefault(require("../models/prestamo.model"));
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const venta_model_1 = __importDefault(require("../models/venta.model"));
const vehiculo_model_1 = __importDefault(require("../models/vehiculo.model"));
const electrodometisco_model_1 = __importDefault(require("../models/electrodometisco.model"));
const pago_model_1 = __importDefault(require("../models/pago.model"));
const detalleventa_model_1 = __importDefault(require("../models/detalleventa.model"));
const cronograma_pagos_model_1 = __importDefault(require("../models/cronograma_pagos.model"));
const inventario_model_1 = __importDefault(require("../models/inventario.model"));
const ticket_model_1 = __importDefault(require("../models/ticket.model"));
//CLIENTES
const searchClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const clientes = yield cliente_model_1.default.findAndCountAll({
            where: {
                [sequelize_1.Op.or]: [
                    { id: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { nombre: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { apellido: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { dni: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { telefono: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { ruc: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { razon_social: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
            limit: pageSize,
            offset: offset,
        });
        const totalItems = clientes.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: clientes.rows,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al realizar la búsqueda de clientes' });
    }
});
exports.searchClientes = searchClientes;
// EMPLEADOS
const searchEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const empleados = yield empleado_model_1.default.findAndCountAll({
            where: {
                [sequelize_1.Op.or]: [
                    { id: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { nombre: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { apellidos: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { dni: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
            limit: pageSize,
            offset: offset,
        });
        const totalItems = empleados.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: empleados.rows,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al realizar la búsqueda de empleados' });
    }
});
exports.searchEmpleados = searchEmpleados;
// ARTICULOS
const searchArticulos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const articulos = yield articulo_model_1.default.findAndCountAll({
            include: [
                { model: categoria_model_1.default, as: 'Categoria' },
                { model: vehiculo_model_1.default, as: 'Vehiculo' },
                { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
            ],
            where: {
                [sequelize_1.Op.or]: [
                    { id: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Categoria.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Vehiculo.descripcion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Electrodomestico.descripcion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Electrodomestico.numero_serie$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Vehiculo.numero_serie$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Vehiculo.numero_motor$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Vehiculo.marca$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Vehiculo.modelo$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Vehiculo.color$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Electrodomestico.color$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Electrodomestico.marca$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Electrodomestico.modelo$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
            limit: pageSize,
            offset: offset,
        });
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
        res.status(500).json({ msg: 'Error al realizar la búsqueda de artículos' });
    }
});
exports.searchArticulos = searchArticulos;
const searchInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const inventario = yield inventario_model_1.default.findAndCountAll({
            include: [
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
            where: {
                [sequelize_1.Op.or]: [
                    { id: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { idarticulo: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { estado_articulo: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.id$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Categoria.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Vehiculo.descripcion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Electrodomestico.descripcion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Electrodomestico.numero_serie$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Vehiculo.numero_serie$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Vehiculo.numero_motor$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Vehiculo.marca$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Vehiculo.modelo$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Vehiculo.color$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Electrodomestico.color$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Electrodomestico.marca$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Electrodomestico.modelo$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
            limit: pageSize,
            offset: offset,
        });
        const totalItems = inventario.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: inventario.rows,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al realizar la búsqueda de artículos en inventario' });
    }
});
exports.searchInventario = searchInventario;
const searchTicketsPrestamos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const tickets = yield ticket_model_1.default.findAndCountAll({
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
            where: {
                [sequelize_1.Op.or]: [
                    { id: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Empleado.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Empleado.apellidos$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.estado$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.fecha_prestamo$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Cliente.dni$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Cliente.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Cliente.apellido$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Categoria.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Vehiculo.descripcion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Electrodomestico.descripcion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Electrodomestico.numero_serie$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Vehiculo.numero_serie$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Vehiculo.numero_motor$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Vehiculo.marca$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Vehiculo.modelo$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Vehiculo.color$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Electrodomestico.color$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Electrodomestico.marca$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Electrodomestico.modelo$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
                '$Prestamo.id$': { [sequelize_1.Op.ne]: null } // Asegura que solo se incluyan tickets con préstamos
            },
            limit: pageSize,
            offset: offset,
            order: [['id', 'DESC']],
        });
        const totalItems = tickets.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: tickets.rows,
        });
    }
    catch (error) {
        console.error('Error al realizar la búsqueda de tickets con préstamos:', error);
        res.status(500).json({ msg: 'Error al realizar la búsqueda de tickets con préstamos' });
    }
});
exports.searchTicketsPrestamos = searchTicketsPrestamos;
// PRESTAMOS
const searchPrestamos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const prestamos = yield prestamo_model_1.default.findAndCountAll({
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
            where: {
                [sequelize_1.Op.or]: [
                    { id: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { fecha_prestamo: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { fecha_devolucion: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { observacion: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { estado: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Empleado.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Empleado.apellidos$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Cliente.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Cliente.apellido$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Categoria.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Vehiculo.descripcion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Electrodomestico.descripcion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Electrodomestico.numero_serie$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Vehiculo.numero_serie$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Vehiculo.numero_motor$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Vehiculo.marca$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Vehiculo.modelo$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Vehiculo.color$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Electrodomestico.color$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Electrodomestico.marca$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Electrodomestico.modelo$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.Electrodomestico.numero_serie$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
            limit: pageSize,
            offset: offset,
        });
        const totalItems = prestamos.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: prestamos.rows,
        });
    }
    catch (error) {
        console.error('Error al realizar la búsqueda de préstamos:', error);
        res.status(500).json({ msg: 'Error al realizar la búsqueda de préstamos' });
    }
});
exports.searchPrestamos = searchPrestamos;
// CATEGORIA
const searchCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const categorias = yield categoria_model_1.default.findAndCountAll({
            where: {
                [sequelize_1.Op.or]: [
                    { nombre: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
            limit: pageSize,
            offset: offset,
        });
        const totalItems = categorias.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: categorias.rows,
        });
    }
    catch (error) {
        console.error('Error al realizar la búsqueda de categorías:', error);
        res.status(500).json({ msg: 'Error al realizar la búsqueda de categorías' });
    }
});
exports.searchCategorias = searchCategorias;
// USUARIOS
const searchUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const usuarios = yield usuario_model_1.default.findAndCountAll({
            include: [{ model: empleado_model_1.default, as: 'Empleado' }],
            where: {
                [sequelize_1.Op.or]: [
                    { '$Empleado.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { usuario: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { permiso: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
            limit: pageSize,
            offset: offset,
        });
        const totalItems = usuarios.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: usuarios.rows,
        });
    }
    catch (error) {
        console.error('Error al realizar la búsqueda de usuarios:', error);
        res.status(500).json({ msg: 'Error al realizar la búsqueda de usuarios' });
    }
});
exports.searchUsuarios = searchUsuarios;
//PAGOS
const searchPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const pagos = yield pago_model_1.default.findAndCountAll({
            include: [
                { model: prestamo_model_1.default, as: 'Prestamo',
                    include: [{ model: cliente_model_1.default, as: 'Cliente' },
                        { model: empleado_model_1.default, as: 'Empleado' },
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
            where: {
                [sequelize_1.Op.or]: [
                    { id: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { fecha_pago: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Empleado.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Empleado.apellidos$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.fecha_prestamo$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.fecha_devolucion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.observacion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Categoria.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Vehiculo.descripcion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Electrodomestico.descripcion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Electrodomestico.numero_serie$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Vehiculo.numero_serie$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Vehiculo.numero_motor$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Vehiculo.marca$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Vehiculo.modelo$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Vehiculo.color$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Electrodomestico.color$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Electrodomestico.marca$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Electrodomestico.modelo$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Prestamo.Articulo.Electrodomestico.numero_serie$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    // Aquí agrega las demás condiciones de búsqueda para cada campo que desees incluir
                ],
            },
            limit: pageSize,
            offset: offset,
        });
        const totalItems = pagos.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: pagos.rows,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al realizar la búsqueda de pagos' });
    }
});
exports.searchPagos = searchPagos;
//VENTAS
const searchVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const ventas = yield venta_model_1.default.findAndCountAll({
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
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
            where: {
                [sequelize_1.Op.or]: [
                    { '$Empleado.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Cliente.nombre$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.descripcion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { comprador: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { tipo_pago: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { fecha_venta: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
            limit: pageSize,
            offset: offset,
        });
        const totalItems = ventas.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: ventas.rows,
        });
    }
    catch (error) {
        console.error('Error al obtener la lista de ventas:', error);
        res.status(500).json({ msg: 'Error al obtener la lista de ventas' });
    }
});
exports.searchVentas = searchVentas;
//DETALLEVENTAS
const searchDetallesVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const detallesVenta = yield detalleventa_model_1.default.findAndCountAll({
            include: [
                { model: venta_model_1.default, as: 'Venta',
                    include: [
                        { model: empleado_model_1.default, as: 'Empleado' },
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
                },
            ],
            where: {
                [sequelize_1.Op.or]: [
                    { '$Venta.comprador$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { '$Articulo.descripcion$': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { cantidad: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { precio_unitario: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
            limit: pageSize,
            offset: offset,
        });
        const totalItems = detallesVenta.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: detallesVenta.rows,
        });
    }
    catch (error) {
        console.error('Error al obtener la lista de detalles de venta:', error);
        res.status(500).json({ msg: 'Error al obtener la lista de detalles de venta' });
    }
});
exports.searchDetallesVenta = searchDetallesVenta;
const searchCronogramaPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const { count, rows } = yield cronograma_pagos_model_1.default.findAndCountAll({
            limit: pageSize,
            offset: offset,
            include: [
                {
                    model: prestamo_model_1.default,
                    as: 'Prestamo',
                    where: {
                        estado: 'pendiente'
                    },
                    include: [
                        {
                            model: cliente_model_1.default,
                            as: 'Cliente',
                            where: {
                                dni: {
                                    [sequelize_1.Op.like]: `%${searchTerm}%`
                                }
                            }
                        },
                        {
                            model: articulo_model_1.default,
                            as: 'Articulo',
                            include: [
                                { model: categoria_model_1.default, as: 'Categoria' },
                                { model: vehiculo_model_1.default, as: 'Vehiculo' },
                                { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                            ]
                        }
                    ]
                }
            ]
        });
        const totalItems = count;
        const totalPages = Math.ceil(totalItems / pageSize);
        res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data: rows,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error searching for payment schedules' });
    }
});
exports.searchCronogramaPagos = searchCronogramaPagos;
