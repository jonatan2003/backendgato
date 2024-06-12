"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalleventa_controller_1 = require("../controllers/detalleventa.controller");
const DetalleVentaRouter = (0, express_1.Router)();
DetalleVentaRouter.post('/', detalleventa_controller_1.createDetalleVenta); // Crear un nuevo registro de detalleventa
DetalleVentaRouter.get('/', detalleventa_controller_1.getDetallesVenta); // Obtener la lista de registros de detalleventa
DetalleVentaRouter.get('/venta/:idVenta', detalleventa_controller_1.getDetalleVentaByVentaId); // Obtener un registro de detalleventa por ID
DetalleVentaRouter.get('/:idDetalleVenta', detalleventa_controller_1.getDetalleVentaById); // Obtener un registro de detalleventa por ID
DetalleVentaRouter.put('/:idDetalleVenta', detalleventa_controller_1.updateDetalleVenta); // Actualizar un registro de detalleventa por ID
DetalleVentaRouter.delete('/:idDetalleVenta', detalleventa_controller_1.deleteDetalleVenta); // Eliminar un registro de detalleventa por ID
exports.default = DetalleVentaRouter;
