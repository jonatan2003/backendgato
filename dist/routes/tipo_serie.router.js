"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipo_serie_controller_1 = require("../controllers/tipo_serie.controller");
const TipoSerieRouter = (0, express_1.Router)();
TipoSerieRouter.post('/', tipo_serie_controller_1.createTipoSerie); // Crear un nuevo tipo de serie
TipoSerieRouter.get('/', tipo_serie_controller_1.getTiposSerie); // Obtener la lista de tipos de serie
TipoSerieRouter.get('/:id', tipo_serie_controller_1.getTipoSerieById); // Obtener un tipo de serie por ID
TipoSerieRouter.put('/:id', tipo_serie_controller_1.updateTipoSerie); // Actualizar un tipo de serie por ID
TipoSerieRouter.delete('/:id', tipo_serie_controller_1.deleteTipoSerie); // Eliminar un tipo de serie por ID
exports.default = TipoSerieRouter;
