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
exports.deleteTicket = exports.updateTicket = exports.getTicketByPrestamoId = exports.getTicketById = exports.getTickets = exports.createTicket = void 0;
const ticket_model_1 = __importDefault(require("../models/ticket.model"));
const pago_model_1 = __importDefault(require("../models/pago.model"));
const prestamo_model_1 = __importDefault(require("../models/prestamo.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const articulo_model_1 = __importDefault(require("../models/articulo.model"));
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const vehiculo_model_1 = __importDefault(require("../models/vehiculo.model"));
const electrodometisco_model_1 = __importDefault(require("../models/electrodometisco.model"));
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const tipo_pago_model_1 = __importDefault(require("../models/tipo_pago.model"));
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { num_serie, num_ticket, idempleado, idpago, idprestamo } = req.body;
    try {
        // Verificar si el prestamo asociado al Ticket existe
        const prestamoExistente = yield prestamo_model_1.default.findByPk(idprestamo);
        if (!prestamoExistente) {
            return res.status(400).json({ msg: 'El prestamo especificado no existe' });
        }
        const nuevoTicket = yield ticket_model_1.default.create({
            num_serie,
            num_ticket,
            idempleado,
            idpago,
            idprestamo,
        });
        res.status(201).json(nuevoTicket);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el Ticket' });
    }
});
exports.createTicket = createTicket;
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield ticket_model_1.default.findAll({
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: pago_model_1.default, as: 'Pago', include: [
                        { model: tipo_pago_model_1.default, as: 'TipoPago',
                        },
                    ], },
                { model: prestamo_model_1.default, as: 'Prestamo',
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        { model: articulo_model_1.default, as: 'Articulo',
                            include: [
                                {
                                    model: categoria_model_1.default,
                                    as: 'Categoria' // Alias para la relación de Artículo
                                },
                                {
                                    model: vehiculo_model_1.default,
                                    as: 'Vehiculo' // Alias para la relación de Artículo
                                },
                                {
                                    model: electrodometisco_model_1.default,
                                    as: 'Electrodomestico' // Alias para la relación de Artículo
                                },
                            ]
                        },
                    ],
                }
            ],
        });
        res.json(tickets);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la lista de Tickets' });
    }
});
exports.getTickets = getTickets;
const getTicketById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ticket = yield ticket_model_1.default.findByPk(id, {
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: pago_model_1.default, as: 'Pago',
                    include: [
                        { model: tipo_pago_model_1.default, as: 'TipoPago',
                        },
                    ],
                },
                { model: prestamo_model_1.default, as: 'Prestamo',
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        { model: articulo_model_1.default, as: 'Articulo',
                            include: [
                                {
                                    model: categoria_model_1.default,
                                    as: 'Categoria' // Alias para la relación de Artículo
                                },
                                {
                                    model: vehiculo_model_1.default,
                                    as: 'Vehiculo' // Alias para la relación de Artículo
                                },
                                {
                                    model: electrodometisco_model_1.default,
                                    as: 'Electrodomestico' // Alias para la relación de Artículo
                                },
                            ]
                        },
                    ],
                }
            ],
        });
        if (!ticket) {
            res.status(404).json({ msg: 'Ticket no encontrado' });
        }
        else {
            res.json(ticket);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el Ticket' });
    }
});
exports.getTicketById = getTicketById;
const getTicketByPrestamoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idprestamo } = req.params;
    try {
        const ticket = yield ticket_model_1.default.findOne({
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                {
                    model: pago_model_1.default, as: 'Pago',
                    include: [
                        { model: tipo_pago_model_1.default, as: 'TipoPago' },
                    ],
                },
                {
                    model: prestamo_model_1.default, as: 'Prestamo',
                    where: { id: idprestamo },
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        {
                            model: articulo_model_1.default, as: 'Articulo',
                            include: [
                                { model: categoria_model_1.default, as: 'Categoria' },
                                { model: vehiculo_model_1.default, as: 'Vehiculo' },
                                { model: electrodometisco_model_1.default, as: 'Electrodomestico' },
                            ],
                        },
                    ],
                },
            ],
        });
        if (!ticket) {
            res.status(404).json({ msg: 'Ticket no encontrado' });
        }
        else {
            res.json(ticket);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el Ticket' });
    }
});
exports.getTicketByPrestamoId = getTicketByPrestamoId;
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const ticket = yield ticket_model_1.default.findByPk(id, {
            include: [
                { model: empleado_model_1.default, as: 'Empleado' },
                { model: pago_model_1.default, as: 'Pago' },
                { model: prestamo_model_1.default, as: 'Prestamo',
                    include: [
                        { model: cliente_model_1.default, as: 'Cliente' },
                        { model: articulo_model_1.default, as: 'Articulo',
                            include: [
                                {
                                    model: categoria_model_1.default,
                                    as: 'Categoria' // Alias para la relación de Artículo
                                },
                                {
                                    model: vehiculo_model_1.default,
                                    as: 'Vehiculo' // Alias para la relación de Artículo
                                },
                                {
                                    model: electrodometisco_model_1.default,
                                    as: 'Electrodomestico' // Alias para la relación de Artículo
                                },
                            ]
                        },
                    ],
                }
            ],
        });
        if (ticket) {
            // Verificar si el prestamo asociado al Ticket existe
            if (body.idprestamo) {
                const prestamoExistente = yield prestamo_model_1.default.findByPk(body.idprestamo);
                if (!prestamoExistente) {
                    return res.status(400).json({ msg: 'El prestamo especificado no existe' });
                }
            }
            // Verificar si el pago asociado al Ticket existe (si idpago no es nulo)
            if (body.idpago) {
                const pagoExistente = yield pago_model_1.default.findByPk(body.idpago);
                if (!pagoExistente) {
                    return res.status(400).json({ msg: 'El pago especificado no existe' });
                }
            }
            yield ticket.update(body);
            res.json({ msg: 'El Ticket fue actualizado con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe un Ticket con el id ${id}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el Ticket' });
    }
});
exports.updateTicket = updateTicket;
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ticket = yield ticket_model_1.default.findByPk(id);
        if (!ticket) {
            res.status(404).json({ msg: 'Ticket no encontrado' });
        }
        else {
            yield ticket.destroy();
            res.json({ msg: 'Ticket eliminado con éxito' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el Ticket' });
    }
});
exports.deleteTicket = deleteTicket;
