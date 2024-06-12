"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prestamo_controller_1 = require("../controllers/prestamo.controller");
const PrestamoRouter = (0, express_1.Router)();
PrestamoRouter.post('/', prestamo_controller_1.createPrestamo); // Crear un nuevo registro de prestamo
PrestamoRouter.get('/', prestamo_controller_1.getPrestamos); // Obtener la lista de registros de prestamo
PrestamoRouter.get('/:idPrestamo', prestamo_controller_1.getPrestamoById); // Obtener un registro de prestamo por ID
PrestamoRouter.put('/:idPrestamo', prestamo_controller_1.updatePrestamo); // Actualizar un registro de prestamo por ID
PrestamoRouter.delete('/:idPrestamo', prestamo_controller_1.deletePrestamo); // Eliminar un registro de prestamo por ID
PrestamoRouter.get('/last/prestamo', prestamo_controller_1.getUltimoPrestamoIngresado);
PrestamoRouter.get('/list/vehiculos', prestamo_controller_1.getPrestamosPorArticuloVehiculo); // Obtener la lista de registros de prestamo
PrestamoRouter.get('/list/electrodomesticos', prestamo_controller_1.getPrestamosPorArticuloElectrodomestico); // Obtener la lista de registros de prestamo
PrestamoRouter.get('/list/vencidos', prestamo_controller_1.getPrestamosVencidos); // Obtener la lista de registros de prestamo
PrestamoRouter.get('/estadoDetalle/:estadoDetalle', prestamo_controller_1.getPrestamosPorEstadoDetalle);
exports.default = PrestamoRouter;
