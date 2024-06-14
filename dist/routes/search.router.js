"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controller_1 = require("../controllers/search.controller");
const SearchRouter = (0, express_1.Router)();
SearchRouter.get('/clientes/:searchTerm', search_controller_1.searchClientes); // Obtener la lista de clientes
SearchRouter.get('/empleados/:searchTerm', search_controller_1.searchEmpleados); // Obtener la lista de empleados
SearchRouter.get('/articulos/:searchTerm', search_controller_1.searchArticulos); // Obtener la lista de articulos
SearchRouter.get('/inventario/:searchTerm', search_controller_1.searchInventario); // Obtener la lista de articulos
SearchRouter.get('/categorias/:searchTerm', search_controller_1.searchCategorias); // Obtener la lista de categorias
SearchRouter.get('/cronograma_pagos/:searchTerm', search_controller_1.searchCronogramaPagos); // Obtener la lista de cronograma de pagos
SearchRouter.get('/prestamos/:searchTerm', search_controller_1.searchPrestamos); // Obtener la lista de prestamos
SearchRouter.get('/ticketsprestamos/:searchTerm', search_controller_1.searchTicketsPrestamos); // Obtener la lista de tickets de prestamos
SearchRouter.get('/comprobantesventas/:searchTerm', search_controller_1.searchComprobantesVentas); // Obtener la lista de tickets de prestamos
SearchRouter.get('/pagos/:searchTerm', search_controller_1.searchPagos); // Obtener la lista de pagos
SearchRouter.get('/usuarios/:searchTerm', search_controller_1.searchUsuarios); // Obtener la lista de usuarios
SearchRouter.get('/ventas/:searchTerm', search_controller_1.searchVentas); // Obtener la lista de ventas
SearchRouter.get('/detalleventas/:searchTerm', search_controller_1.searchDetallesVenta); // Obtener la lista de ventas
exports.default = SearchRouter;
