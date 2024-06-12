"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleadoController = __importStar(require("../controllers/empleado.controller"));
const EmpleadosRouter = (0, express_1.Router)();
EmpleadosRouter.post('/', empleadoController.createEmpleado); // Crear un nuevo empleado
EmpleadosRouter.get('/', empleadoController.getEmpleados); // Obtener la lista de empleados
EmpleadosRouter.get('/:idEmpleado', empleadoController.getEmpleadoById); // Obtener un empleado por ID
EmpleadosRouter.put('/:idEmpleado', empleadoController.updateEmpleado); // Actualizar un empleado por ID
EmpleadosRouter.delete('/:idEmpleado', empleadoController.deleteEmpleado); // Eliminar un empleado por ID
exports.default = EmpleadosRouter;
