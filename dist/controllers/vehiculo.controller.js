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
exports.getUltimoVehiculo = exports.deleteVehiculo = exports.updateVehiculo = exports.getVehiculoById = exports.getVehiculos = exports.createVehiculo = void 0;
const vehiculo_model_1 = __importDefault(require("../models/vehiculo.model"));
// Crear un nuevo vehículo
const createVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carroceria, marca, modelo, color, numero_serie, numero_motor, placa, descripcion } = req.body;
    try {
        // Verificar si ya existe un vehículo con el mismo numero_serie
        const vehiculoExistente = yield vehiculo_model_1.default.findOne({ where: { numero_serie } });
        if (vehiculoExistente) {
            return res.status(400).json({ msg: 'Ya existe un vehículo con este número de serie' });
        }
        // Crear un nuevo vehículo si no existe
        const nuevoVehiculo = yield vehiculo_model_1.default.create({
            carroceria,
            marca,
            modelo,
            color,
            numero_serie,
            numero_motor,
            placa,
            descripcion,
        });
        res.status(201).json(nuevoVehiculo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el vehículo' });
    }
});
exports.createVehiculo = createVehiculo;
// Obtener todos los vehículos
const getVehiculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehiculos = yield vehiculo_model_1.default.findAll();
        res.json(vehiculos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de vehículos' });
    }
});
exports.getVehiculos = getVehiculos;
// Obtener un vehículo por su ID
const getVehiculoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vehiculo = yield vehiculo_model_1.default.findByPk(id);
        if (vehiculo) {
            res.json(vehiculo);
        }
        else {
            res.status(404).json({ msg: 'Vehículo no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el vehículo' });
    }
});
exports.getVehiculoById = getVehiculoById;
// Actualizar un vehículo
const updateVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { carroceria, marca, modelo, color, numero_serie, numero_motor, placa, descripcion } = req.body;
    try {
        const vehiculo = yield vehiculo_model_1.default.findByPk(id);
        if (vehiculo) {
            yield vehiculo.update({ carroceria, marca, modelo, color, numero_serie, numero_motor, placa, descripcion });
            res.json({ msg: 'Vehículo actualizado correctamente' });
        }
        else {
            res.status(404).json({ msg: 'Vehículo no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el vehículo' });
    }
});
exports.updateVehiculo = updateVehiculo;
// Eliminar un vehículo
const deleteVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vehiculo = yield vehiculo_model_1.default.findByPk(id);
        if (vehiculo) {
            yield vehiculo.destroy();
            res.json({ msg: 'Vehículo eliminado correctamente' });
        }
        else {
            res.status(404).json({ msg: 'Vehículo no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el vehículo' });
    }
});
exports.deleteVehiculo = deleteVehiculo;
const getUltimoVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Realizar una consulta para obtener el último vehículo ingresado
        const ultimoVehiculo = yield vehiculo_model_1.default.findOne({
            order: [['id', 'DESC']], // Ordenar por ID de forma descendente para obtener el último vehículo ingresado
        });
        res.json(ultimoVehiculo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el último vehículo ingresado' });
    }
});
exports.getUltimoVehiculo = getUltimoVehiculo;
