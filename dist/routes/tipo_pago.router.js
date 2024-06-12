"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipo_pago_controller_1 = require("../controllers/tipo_pago.controller");
const TipoPagoRouter = (0, express_1.Router)();
TipoPagoRouter.post('/', tipo_pago_controller_1.createTipoPago); // Crear un nuevo tipo de pago
TipoPagoRouter.get('/', tipo_pago_controller_1.getTiposPago); // Obtener la lista de tipos de pago
TipoPagoRouter.get('/:id', tipo_pago_controller_1.getTipoPagoById); // Obtener un tipo de pago por ID
TipoPagoRouter.put('/:id', tipo_pago_controller_1.updateTipoPago); // Actualizar un tipo de pago por ID
TipoPagoRouter.delete('/:id', tipo_pago_controller_1.deleteTipoPago); // Eliminar un tipo de pago por ID
exports.default = TipoPagoRouter;
