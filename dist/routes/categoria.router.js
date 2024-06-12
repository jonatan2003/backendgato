"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_controller_1 = require("../controllers/categoria.controller");
const CategoriaRouter = (0, express_1.Router)();
CategoriaRouter.post('/', categoria_controller_1.createCategoria); // Crear un nuevo registro de categoria
CategoriaRouter.get('/', categoria_controller_1.getCategorias); // Obtener la lista de registros de categoria
CategoriaRouter.get('/:idCategoria', categoria_controller_1.getCategoriaById); // Obtener un registro de categoria por ID
CategoriaRouter.put('/:idCategoria', categoria_controller_1.updateCategoria); // Actualizar un registro de categoria por ID
CategoriaRouter.delete('/:idCategoria', categoria_controller_1.deleteCategoria); // Eliminar un registro de categoria por ID
exports.default = CategoriaRouter;
