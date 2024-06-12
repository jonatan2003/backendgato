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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http")); // Importa el módulo http de Node.js
const socket_io_1 = require("socket.io"); // Importa Server y Socket de socket.io
const prestamo_router_1 = __importDefault(require("./routes/prestamo.router"));
const cliente_router_1 = __importDefault(require("./routes/cliente.router"));
const articulo_router_1 = __importDefault(require("./routes/articulo.router"));
const venta_router_1 = __importDefault(require("./routes/venta.router"));
const pago_router_1 = __importDefault(require("./routes/pago.router"));
const detaventa_router_1 = __importDefault(require("./routes/detaventa.router"));
const usuario_router_1 = __importDefault(require("./routes/usuario.router"));
const connection_db_1 = __importDefault(require("./db/connection.db"));
const login_router_1 = __importDefault(require("./routes/login.router"));
const empleado_router_1 = __importDefault(require("./routes/empleado.router"));
const categoria_router_1 = __importDefault(require("./routes/categoria.router"));
const search_router_1 = __importDefault(require("./routes/search.router"));
const electrodomestico_router_1 = __importDefault(require("./routes/electrodomestico.router"));
const vehiculo_router_1 = __importDefault(require("./routes/vehiculo.router"));
const paginacion_router_1 = __importDefault(require("./routes/paginacion.router"));
const ticket_router_1 = __importDefault(require("./routes/ticket.router"));
const apidni_router_1 = __importDefault(require("./routes/apidni.router"));
const paginacion_controller_1 = require("./controllers/paginacion.controller");
const boleta_router_1 = __importDefault(require("./routes/boleta.router"));
const inventario_router_1 = __importDefault(require("./routes/inventario.router"));
const tipo_pago_router_1 = __importDefault(require("./routes/tipo_pago.router"));
const comprobante_venta_router_1 = __importDefault(require("./routes/comprobante_venta.router"));
const sunat_router_1 = __importDefault(require("./routes/sunat.router"));
const apiruc_router_1 = __importDefault(require("./routes/apiruc.router"));
const cronograma_pagos_router_1 = __importDefault(require("./routes/cronograma_pagos.router"));
const notacredito_router_1 = __importDefault(require("./routes/notacredito.router"));
class Server {
    constructor() {
        this.isRequesting = false;
        this.isUpdatingPrestamos = false;
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.httpServer = new http_1.default.Server(this.app); // Crea un servidor http usando express
        this.io = new socket_io_1.Server(this.httpServer); // Crea una instancia de SocketIOServer asociada al servidor http
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
        this.setupWebSockets();
    }
    listen() {
        this.httpServer.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:4200',
            credentials: true // Habilita el intercambio de cookies o encabezados de autenticación
        }));
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API Working'
            });
        });
        this.app.use('/api/v1/login', login_router_1.default);
        this.app.use('/api/v1/usuarios', usuario_router_1.default);
        this.app.use('/api/v1/clientes', cliente_router_1.default);
        this.app.use('/api/v1/articulos', articulo_router_1.default);
        this.app.use('/api/v1/categorias', categoria_router_1.default);
        this.app.use('/api/v1/electrodomesticos', electrodomestico_router_1.default);
        this.app.use('/api/v1/vehiculos', vehiculo_router_1.default);
        this.app.use('/api/v1/pagos', pago_router_1.default);
        this.app.use('/api/v1/prestamos', prestamo_router_1.default);
        this.app.use('/api/v1/detaventas', detaventa_router_1.default);
        this.app.use('/api/v1/ventas', venta_router_1.default);
        this.app.use('/api/v1/empleados', empleado_router_1.default);
        this.app.use('/api/v1/search', search_router_1.default);
        this.app.use('/api/v1/paginacion', paginacion_router_1.default);
        this.app.use('/api/v1/inventario', inventario_router_1.default);
        this.app.use('/api/v1/tipopagos', tipo_pago_router_1.default);
        this.app.use('/api/v1/cronograma_pagos', cronograma_pagos_router_1.default);
        this.app.use('/api/v1/comprobantes_ventas', comprobante_venta_router_1.default);
        this.app.use('/api/v1/ticket', ticket_router_1.default);
        this.app.use('/api/v1/notacreditos', notacredito_router_1.default);
        this.app.use('/api/v1/dni', apidni_router_1.default);
        this.app.use('/api/v1/ruc', apiruc_router_1.default);
        this.app.use('/api/v1/boletas', boleta_router_1.default);
        this.app.use('/api/v1/sunat', sunat_router_1.default);
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_db_1.default.authenticate();
                console.log('Base de datos conectada');
            }
            catch (error) {
                console.log('Error al conectarse a la base de datos:', error);
            }
        });
    }
    setupWebSockets() {
        try {
            this.io.on('connection', (socket) => {
                console.log('Cliente conectado:', socket.id);
                socket.on('disconnect', () => {
                    console.log('Cliente desconectado:', socket.id);
                });
            });
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                if (this.isRequesting) {
                    console.log('Esperando a que la petición actual termine...');
                    return;
                }
                this.isRequesting = true;
                const req = {};
                const res = {
                    json: (data) => data,
                    status: (statusCode) => ({
                        json: (data) => data
                    })
                };
                try {
                    yield (0, paginacion_controller_1.actualizarPrestamosAVenta)(req, res);
                }
                catch (error) {
                    console.error('Error al actualizar préstamos:', error);
                }
                finally {
                    this.isRequesting = false;
                }
            }), 120000); // 60000 es 60 segundos para pruebas, 72000000 20 horas para producción
        }
        catch (error) {
            console.log('Error en la configuración de WebSockets:', error);
        }
    }
    getIO() {
        return this.io;
    }
}
const serverInstance = new Server();
exports.default = serverInstance;
