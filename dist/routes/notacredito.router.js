"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notacredito_controller_1 = require("../controllers/notacredito.controller");
const NotasCreditoRouter = (0, express_1.Router)();
// Rutas para las notas de crédito
NotasCreditoRouter.post('/', notacredito_controller_1.createNotaCredito); // Crear una nueva nota de crédito
NotasCreditoRouter.get('/', notacredito_controller_1.getAllNotasCredito); // Obtener la lista de notas de crédito
NotasCreditoRouter.get('/:id', notacredito_controller_1.getNotaCreditoById); // Obtener una nota de crédito por ID
NotasCreditoRouter.put('/:id', notacredito_controller_1.updateNotaCredito); // Actualizar una nota de crédito por ID
NotasCreditoRouter.delete('/:id', notacredito_controller_1.deleteNotaCredito); // Eliminar una nota de crédito por ID
exports.default = NotasCreditoRouter;
