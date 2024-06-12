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
exports.searchClientes = exports.deleteCliente = exports.updateCliente = exports.getClienteById = exports.getClientes = exports.createCliente = void 0;
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const sequelize_1 = require("sequelize"); // Agregar esta línea
const createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, direccion, dni, ruc, razon_social, telefono, rubro } = req.body;
    try {
        // Construir condiciones dinámicamente
        let condiciones = {};
        if (dni && dni !== 'no') {
            condiciones.dni = dni;
        }
        else if (ruc && ruc !== 'no') {
            condiciones.ruc = ruc;
        }
        else {
            return res.status(400).json({ msg: 'Debe proporcionar al menos DNI o RUC' });
        }
        // Verificar si ya existe un cliente con el mismo DNI o RUC
        const clienteExistente = yield cliente_model_1.default.findOne({
            where: condiciones
        });
        if (clienteExistente) {
            return res.status(400).json({ msg: 'Ya existe un cliente con el mismo DNI o RUC' });
        }
        // Crear el nuevo cliente
        const nuevoCliente = yield cliente_model_1.default.create({
            nombre,
            apellido,
            direccion,
            dni,
            ruc,
            razon_social,
            telefono,
            rubro
        });
        // Devolver el nuevo cliente creado
        res.status(201).json(nuevoCliente);
    }
    catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el cliente' });
    }
});
exports.createCliente = createCliente;
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield cliente_model_1.default.findAll();
        res.json(clientes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de clientes' });
    }
});
exports.getClientes = getClientes;
const getClienteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    try {
        const cliente = yield cliente_model_1.default.findByPk(idCliente);
        if (!cliente) {
            res.status(404).json({ msg: 'Cliente no encontrado' });
        }
        else {
            res.json(cliente);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el cliente' });
    }
});
exports.getClienteById = getClienteById;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idCliente } = req.params;
    try {
        const cliente = yield cliente_model_1.default.findByPk(idCliente);
        if (cliente) {
            yield cliente.update(body);
            res.json({ msg: 'El cliente fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un cliente con el id ${idCliente}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el cliente' });
    }
});
exports.updateCliente = updateCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    try {
        const cliente = yield cliente_model_1.default.findByPk(idCliente);
        if (!cliente) {
            res.status(404).json({ msg: 'Cliente no encontrado' });
        }
        else {
            yield cliente.destroy();
            res.json({ msg: 'Cliente eliminado con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el cliente' });
    }
});
exports.deleteCliente = deleteCliente;
const searchClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    try {
        const clientes = yield cliente_model_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { nombre: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { apellido: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { direccion: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { dni: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { telefono: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
        });
        if (clientes.length === 0) {
            // No se encontraron clientes
            res.status(404).json({ msg: 'No se encontraron clientes que coincidan con el término de búsqueda' });
        }
        else {
            // Se encontraron clientes
            res.json(clientes);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al realizar la búsqueda de clientes' });
    }
});
exports.searchClientes = searchClientes;
