"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paginacion_controller_1 = require("../controllers/paginacion.controller");
const PaginacionRouter = (0, express_1.Router)();
// Rutas para clientes
PaginacionRouter.get('/clientes', paginacion_controller_1.getClientes);
PaginacionRouter.get('/clientesdni', paginacion_controller_1.getClientesDNI);
PaginacionRouter.get('/clientesruc', paginacion_controller_1.getClientesRUC);
// Rutas para préstamos
PaginacionRouter.get('/prestamos', paginacion_controller_1.getPrestamos);
// Rutas para empleados
PaginacionRouter.get('/empleados', paginacion_controller_1.getEmpleados);
// Rutas para artículos
PaginacionRouter.get('/articulos/:categoriaId', paginacion_controller_1.getArticulos);
// Rutas para vehículos
PaginacionRouter.get('/vehiculos', paginacion_controller_1.getVehiculos);
// Rutas para electrodomésticos
PaginacionRouter.get('/electrodomesticos', paginacion_controller_1.getElectrodomesticos);
PaginacionRouter.get('/inventario', paginacion_controller_1.getInventario);
PaginacionRouter.get('/comprobantes_ventas', paginacion_controller_1.getComprobantesVenta);
PaginacionRouter.get('/tickets', paginacion_controller_1.getTickets);
PaginacionRouter.get('/cronograma_pagos', paginacion_controller_1.getCronogramaPagosPendientes);
PaginacionRouter.get('/ticketsprestamos', paginacion_controller_1.getTicketsPrestamos);
PaginacionRouter.get('/tprestamospendientes', paginacion_controller_1.getTicketsPrestamosPendientes);
PaginacionRouter.get('/ticketsventas', paginacion_controller_1.getTicketsVentas);
PaginacionRouter.get('/ticketspagos', paginacion_controller_1.getTicketsPagos);
PaginacionRouter.get('/tipospago', paginacion_controller_1.getTiposPago);
// Rutas para detalles de préstamo
PaginacionRouter.get('/pagos', paginacion_controller_1.getPagos);
// Rutas para categorías
PaginacionRouter.get('/categorias', paginacion_controller_1.getCategorias);
// Rutas para ventas
PaginacionRouter.get('/ventas', paginacion_controller_1.getVentas);
// Rutas para detalles de venta
PaginacionRouter.get('/detalleventas', paginacion_controller_1.getDetallesVenta);
PaginacionRouter.get('/usuarios', paginacion_controller_1.getUsuarios);
PaginacionRouter.get('/prestamosvencidos', paginacion_controller_1.actualizarPrestamosAVenta);
PaginacionRouter.get('/prestamosventas', paginacion_controller_1.getPrestamosVenta);
PaginacionRouter.get('/prestamospendientes', paginacion_controller_1.getPrestamosPendientes);
PaginacionRouter.get('/prestamospagados', paginacion_controller_1.getPrestamosPagados);
exports.default = PaginacionRouter;
