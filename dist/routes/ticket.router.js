"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_controller_1 = require("../controllers/ticket.controller");
const TicketRouter = (0, express_1.Router)();
TicketRouter.post('/', ticket_controller_1.createTicket); // Crear un nuevo ticket
TicketRouter.get('/', ticket_controller_1.getTickets); // Obtener la lista de tickets
TicketRouter.get('/:id', ticket_controller_1.getTicketById); // Obtener un ticket por ID
TicketRouter.get('/prestamo/:idprestamo', ticket_controller_1.getTicketByPrestamoId); // Obtener un ticket por ID
TicketRouter.put('/:id', ticket_controller_1.updateTicket); // Actualizar un ticket por ID
TicketRouter.delete('/:id', ticket_controller_1.deleteTicket); // Eliminar un ticket por ID
exports.default = TicketRouter;
