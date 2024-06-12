"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const venta_controller_1 = require("../controllers/venta.controller");
const VentasRouter = (0, express_1.Router)();
VentasRouter.post('/', venta_controller_1.createVenta); // Crear una nueva venta
VentasRouter.get('/', venta_controller_1.getVentas); // Obtener la lista de ventas
VentasRouter.get('/:idVenta', venta_controller_1.getVentaById); // Obtener una venta por ID
VentasRouter.put('/:idVenta', venta_controller_1.updateVenta); // Actualizar una venta por ID
VentasRouter.delete('/:idVenta', venta_controller_1.deleteVenta); // Eliminar una venta por ID
exports.default = VentasRouter;
