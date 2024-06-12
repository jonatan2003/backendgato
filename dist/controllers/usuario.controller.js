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
exports.deleteUsuario = exports.updateUsuario = exports.getUsuarioById = exports.getUsuarios = exports.createUsuario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_empleado, usuario, password, permiso } = req.body;
    try {
        // Verifica si el usuario ya existe en la base de datos
        const existingUser = yield usuario_model_1.default.findOne({ where: { usuario } });
        if (existingUser) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }
        // Hashea la contraseña antes de almacenarla en la base de datos
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // Crea un nuevo usuario con la contraseña hasheada
        const nuevoUsuario = yield usuario_model_1.default.create({
            id_empleado,
            usuario,
            password: hashedPassword,
            permiso,
        });
        res.status(201).json(nuevoUsuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error, comuníquese con soporte' });
    }
});
exports.createUsuario = createUsuario;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_model_1.default.findAll({
            include: [
                { model: empleado_model_1.default, as: 'Empleado' }
            ],
        });
        res.json(usuarios);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de usuarios' });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario } = req.params;
    try {
        const usuario = yield usuario_model_1.default.findByPk(idUsuario, {
            include: [
                { model: empleado_model_1.default, as: 'Empleado' }
            ],
        });
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(usuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el usuario' });
    }
});
exports.getUsuarioById = getUsuarioById;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id, usuario, password_actual, password_nueva, permiso } = body;
    try {
        const user = yield usuario_model_1.default.findByPk(id); // Utiliza findByPk para buscar por clave primaria
        if (!user) {
            return res.status(404).json({ msg: `No existe un usuario con el id ${id}` });
        }
        // Verificar si se proporcionó una nueva contraseña
        if (password_nueva) {
            // Verificar si la contraseña actual es correcta
            const coincideContrasena = yield verificarContrasena(password_actual, user.password);
            if (!coincideContrasena) {
                return res.status(401).json({ msg: 'La contraseña actual es incorrecta' });
            }
            // Encriptar la nueva contraseña antes de almacenarla
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(password_nueva, saltRounds);
            user.password = hashedPassword;
        }
        // Actualizar el usuario con los campos proporcionados en la solicitud
        if (usuario)
            user.usuario = usuario;
        if (permiso)
            user.permiso = permiso;
        yield user.save();
        res.json({ msg: 'El usuario fue actualizado con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error, comuníquese con soporte' });
    }
});
exports.updateUsuario = updateUsuario;
const verificarContrasena = (contrasena, hashedContrasena) => __awaiter(void 0, void 0, void 0, function* () {
    // Comparar la contraseña proporcionada con la contraseña almacenada en forma hasheada
    return yield bcrypt_1.default.compare(contrasena, hashedContrasena);
});
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario } = req.params;
    try {
        const usuario = yield usuario_model_1.default.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        yield usuario.destroy();
        res.json({ msg: 'Usuario eliminado con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el usuario' });
    }
});
exports.deleteUsuario = deleteUsuario;
