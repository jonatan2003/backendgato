"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculo_controller_1 = require("../controllers/vehiculo.controller");
const VehiculosRouter = (0, express_1.Router)();
VehiculosRouter.post('/', vehiculo_controller_1.createVehiculo); // Crear un nuevo vehículo
VehiculosRouter.get('/', vehiculo_controller_1.getVehiculos); // Obtener la lista de vehículos
VehiculosRouter.get('/:id', vehiculo_controller_1.getVehiculoById); // Obtener un vehículo por ID
VehiculosRouter.put('/:id', vehiculo_controller_1.updateVehiculo); // Actualizar un vehículo por ID
VehiculosRouter.delete('/:id', vehiculo_controller_1.deleteVehiculo); // Eliminar un vehículo por ID
VehiculosRouter.get('/last/vehiculo', vehiculo_controller_1.getUltimoVehiculo); // Obtener la lista de vehículos
exports.default = VehiculosRouter;
