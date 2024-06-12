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
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importa el paquete JWT
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, password } = req.body;
    try {
        // Buscar el usuario por nombre de usuario
        const user = yield usuario_model_1.default.findOne({ where: { usuario } });
        if (!user) {
            return res.status(404).json({ msg: 'Nombre de usuario incorrecto' });
        }
        // Verificar la contraseña
        const hashedPasswordFromDB = user.get('password');
        const match = yield bcrypt_1.default.compare(password, hashedPasswordFromDB);
        if (!match) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        }
        // Generar un token JWT
        const token = jsonwebtoken_1.default.sign({ usuario: usuario }, 'secreto', { expiresIn: '1m' }); // Cambia 'secreto' por tu clave secreta
        // Enviar el token y los detalles del usuario como respuesta
        res.json({
            msg: 'Inicio de sesión exitoso',
            token,
            idusuario: user.get('id'),
            permiso: user.get('permiso'),
            usuario: user.get('usuario'),
            empleado: user.get('id_empleado'),
            password: user.get('password')
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error, comuníquese con soporte' });
    }
});
exports.login = login;
