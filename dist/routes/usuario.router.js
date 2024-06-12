"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const UsuariosRouter = (0, express_1.Router)();
UsuariosRouter.post('/', usuario_controller_1.createUsuario); // Crear un nuevo usuario
UsuariosRouter.get('/', usuario_controller_1.getUsuarios); // Obtener la lista de usuarios
UsuariosRouter.get('/:idUsuario', usuario_controller_1.getUsuarioById); // Obtener un usuario por ID
UsuariosRouter.put('/:idUsuario', usuario_controller_1.updateUsuario); // Actualizar un usuario por ID
UsuariosRouter.delete('/:idUsuario', usuario_controller_1.deleteUsuario); // Eliminar un usuario por ID
exports.default = UsuariosRouter;
