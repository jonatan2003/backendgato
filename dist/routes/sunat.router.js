"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sunat_controller_1 = require("../controllers/sunat.controller");
const routerSUNAT = (0, express_1.Router)();
routerSUNAT.get('/dni/:dni', sunat_controller_1.consultarDNI);
routerSUNAT.get('/ruc/:ruc', sunat_controller_1.consultarRUC);
exports.default = routerSUNAT;
