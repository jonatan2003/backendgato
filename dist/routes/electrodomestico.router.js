"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const electrodomestico_controller_1 = require("../controllers/electrodomestico.controller");
const ElectrodomesticosRouter = (0, express_1.Router)();
ElectrodomesticosRouter.post('/', electrodomestico_controller_1.createElectrodomestico); // Crear un nuevo electrodoméstico
ElectrodomesticosRouter.get('/', electrodomestico_controller_1.getElectrodomesticos); // Obtener la lista de electrodomésticos
ElectrodomesticosRouter.get('/:id', electrodomestico_controller_1.getElectrodomesticoById); // Obtener un electrodoméstico por ID
ElectrodomesticosRouter.put('/:id', electrodomestico_controller_1.updateElectrodomestico); // Actualizar un electrodoméstico por ID
ElectrodomesticosRouter.delete('/:id', electrodomestico_controller_1.deleteElectrodomestico); // Eliminar un electrodoméstico por ID
ElectrodomesticosRouter.get('/last/electrodomestico', electrodomestico_controller_1.getUltimoElectrodomestico); // Obtener la lista de electrodomésticos
exports.default = ElectrodomesticosRouter;
