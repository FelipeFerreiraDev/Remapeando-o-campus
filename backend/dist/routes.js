"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("./config/upload"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const RoomController_1 = __importDefault(require("./controllers/RoomController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const routes = express_1.Router();
const upload = multer_1.default(upload_1.default);
// Criação de sala
routes.post('/room', upload.array('images'), RoomController_1.default.create);
// Busca de salas
routes.get('/room', RoomController_1.default.index);
// Busca de sala pelo Id
routes.get('/room/:id', RoomController_1.default.show);
// Busca de salas por campus
routes.get('/roomList/:campus/:name', RoomController_1.default.showListRoom);
// Deletar sala
routes.delete('/room/:campus/:name', RoomController_1.default.delete);
// Atualizar sala
routes.put('/room/:id', RoomController_1.default.update);
/******* ROTAS PARA O USUÁRIO */
routes.post('/user/create', UserController_1.default.create);
routes.post('/user/authenticate', AuthController_1.default.authenticate);
exports.default = routes;
