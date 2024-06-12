"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmpleado = exports.updateEmpleado = exports.getEmpleadoById = exports.getEmpleados = exports.createEmpleado = void 0;
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const createEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellidos, dni, fecha_nacimiento, fecha_contratacion, genero, direccion, telefono, correo, tipo_contrato, estado } = req.body;
    try {
        const nuevoEmpleado = yield empleado_model_1.default.create({
            nombre,
            apellidos,
            dni,
            fecha_nacimiento,
            fecha_contratacion,
            genero,
            direccion,
            telefono,
            correo,
            tipo_contrato,
            estado,
        });
        res.status(201).json(nuevoEmpleado);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el empleado' });
    }
});
exports.createEmpleado = createEmpleado;
const getEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empleados = yield empleado_model_1.default.findAll();
        res.json(empleados);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de empleados' });
    }
});
exports.getEmpleados = getEmpleados;
const getEmpleadoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEmpleado } = req.params;
    try {
        const empleado = yield empleado_model_1.default.findByPk(idEmpleado);
        if (!empleado) {
            res.status(404).json({ msg: 'Empleado no encontrado' });
        }
        else {
            res.json(empleado);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el empleado' });
    }
});
exports.getEmpleadoById = getEmpleadoById;
const updateEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idEmpleado } = req.params;
    try {
        const empleado = yield empleado_model_1.default.findByPk(idEmpleado);
        if (empleado) {
            yield empleado.update(body);
            res.json({ msg: 'El empleado fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un empleado con el id ${idEmpleado}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el empleado' });
    }
});
exports.updateEmpleado = updateEmpleado;
const deleteEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEmpleado } = req.params;
    try {
        const empleado = yield empleado_model_1.default.findByPk(idEmpleado);
        if (!empleado) {
            res.status(404).json({ msg: 'Empleado no encontrado' });
        }
        else {
            yield empleado.destroy();
            res.json({ msg: 'Empleado eliminado con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el empleado' });
    }
});
exports.deleteEmpleado = deleteEmpleado;
