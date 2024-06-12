"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipo_comprobante_controller_1 = require("../controllers/tipo_comprobante.controller");
const TipoComprobanteRouter = (0, express_1.Router)();
TipoComprobanteRouter.post('/', tipo_comprobante_controller_1.createTipoComprobante);
TipoComprobanteRouter.get('/', tipo_comprobante_controller_1.getTiposComprobante);
TipoComprobanteRouter.get('/:id', tipo_comprobante_controller_1.getTipoComprobanteById);
TipoComprobanteRouter.put('/:id', tipo_comprobante_controller_1.updateTipoComprobante);
TipoComprobanteRouter.delete('/:id', tipo_comprobante_controller_1.deleteTipoComprobante);
exports.default = TipoComprobanteRouter;