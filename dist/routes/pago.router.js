"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pago_controller_1 = require("../controllers/pago.controller");
const PagoRouter = (0, express_1.Router)();
PagoRouter.post('/', pago_controller_1.createPago); // Crear un nuevo registro de pago
PagoRouter.get('/', pago_controller_1.getPagos); // Obtener la lista de registros de pago
PagoRouter.get('/:id', pago_controller_1.getPagoById); // Obtener un registro de pago por ID
PagoRouter.put('/:id', pago_controller_1.updatePago); // Actualizar un registro de pago por ID
PagoRouter.delete('/:id', pago_controller_1.deletePago); // Eliminar un registro de pago por ID
exports.default = PagoRouter;
