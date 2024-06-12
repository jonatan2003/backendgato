"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articulo_controller_1 = require("../controllers/articulo.controller");
const ArticulosRouter = (0, express_1.Router)();
ArticulosRouter.post('/', articulo_controller_1.createArticulo); // Crear un nuevo artículo
ArticulosRouter.get('/', articulo_controller_1.getArticulos); // Obtener la lista de artículos
ArticulosRouter.get('/:id', articulo_controller_1.getArticuloById); // Obtener un artículo por ID
ArticulosRouter.put('/:id', articulo_controller_1.updateArticulo); // Actualizar un artículo por ID
ArticulosRouter.delete('/:idArticulo', articulo_controller_1.deleteArticulo); // Eliminar un artículo por ID
ArticulosRouter.get('/list/Vehiculos', articulo_controller_1.getArticulosVehiculo); // Obtener la lista de artículos
ArticulosRouter.get('/list/Electrodomesticos', articulo_controller_1.getArticulosElectrodomestico); // Obtener la lista de artículos
exports.default = ArticulosRouter;
