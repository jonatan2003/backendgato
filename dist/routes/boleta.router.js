"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boleta_controller_1 = require("../controllers/boleta.controller");
const BoletasRouter = (0, express_1.Router)();
BoletasRouter.post('/', boleta_controller_1.createBoleta); // Crear un nuevo artículo
BoletasRouter.get('/', boleta_controller_1.getBoletas); // Obtener la lista de artículos
BoletasRouter.get('/:id', boleta_controller_1.getBoletaById); // Obtener un artículo por ID
BoletasRouter.put('/:id', boleta_controller_1.updateBoleta); // Actualizar un artículo por ID
BoletasRouter.delete('/:idArticulo', boleta_controller_1.deleteBoleta); // Eliminar un artículo por ID
exports.default = BoletasRouter;
