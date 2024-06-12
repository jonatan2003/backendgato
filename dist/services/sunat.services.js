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
exports.getRUCInfo = exports.getDNIInfo = void 0;
const axios_1 = __importDefault(require("axios"));
const PERSONA_ID = '6642b4d680b7c00015d239e0';
const PERSONA_TOKEN = 'DEV_smduUDo3UV3VeqKO8gEzk8Y7Kix1FBEozAmhTS9Add53ZNAYAaoPDtDrJoMY6irD';
const AUTH_TOKEN = `${PERSONA_ID}+${PERSONA_TOKEN}`;
const API_URL = 'https://back.apisunat.com';
const getDNIInfo = (dni) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${API_URL}/dni/${dni}`, {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });
        return response.data;
    }
    catch (error) {
        throw error;
    }
});
exports.getDNIInfo = getDNIInfo;
const getRUCInfo = (ruc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${API_URL}/ruc/${ruc}`, {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });
        return response.data;
    }
    catch (error) {
        throw error;
    }
});
exports.getRUCInfo = getRUCInfo;
