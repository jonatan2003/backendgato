"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventario_controller_1 = require("../controllers/inventario.controller");
const InventarioRouter = (0, express_1.Router)();
InventarioRouter.post('/', inventario_controller_1.createInventario); // Crear un nuevo registro de inventario
InventarioRouter.get('/', inventario_controller_1.getInventarios); // Obtener la lista de registros de inventario
InventarioRouter.get('/:id', inventario_controller_1.getInventarioById); // Obtener un registro de inventario por ID
InventarioRouter.put('/:id', inventario_controller_1.updateInventario); // Actualizar un registro de inventario por ID
InventarioRouter.delete('/:id', inventario_controller_1.deleteInventario); // Eliminar un registro de inventario por ID
exports.default = InventarioRouter;
