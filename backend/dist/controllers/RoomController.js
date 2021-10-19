"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Rooms_1 = __importDefault(require("../models/Rooms"));
const room_view_1 = __importDefault(require("../views/room_view"));
const Yup = __importStar(require("yup"));
exports.default = {
    // Exibe Todos as salas
    async index(request, response) {
        const roomsRepository = typeorm_1.getRepository(Rooms_1.default);
        const room = await roomsRepository.find({
            relations: ['images']
        });
        return response.json(room_view_1.default.renderMany(room));
    },
    // Exibe uma sala específica
    async show(request, response) {
        const { id } = request.params;
        const roomsRepository = typeorm_1.getRepository(Rooms_1.default);
        const room = await roomsRepository.findOneOrFail(id, {
            relations: ['images']
        });
        return response.json(room_view_1.default.render(room));
    },
    // Cria uma sala
    async create(request, response) {
        const { name, nameShow, campus, type, latitude, longitude, description, link } = request.body;
        /*name.toLowerCase()
        campus.toLowerCase();*/
        const roomsRepository = typeorm_1.getRepository(Rooms_1.default);
        const requestImages = request.files;
        const images = requestImages === null || requestImages === void 0 ? void 0 : requestImages.map(image => {
            return { path: image.filename };
        });
        const data = {
            name: name.toLowerCase(),
            nameShow,
            campus: campus.toLowerCase(),
            type,
            latitude,
            longitude,
            description,
            images,
            link
        };
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            nameShow: Yup.string().required('Nome obrigatório'),
            campus: Yup.string().required('Nome do campus obrigatório'),
            type: Yup.string().required('Tipo de sala obrigatório'),
            latitude: Yup.number().required('Latitude da sala obrigatória'),
            longitude: Yup.number().required('Longitude da sala obrigatória'),
            description: Yup.string().required('Descrição obrigatória').max(300),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required('Imagem inválida')
            }))
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        const room = roomsRepository.create(data);
        await roomsRepository.save(room);
        return response.status(201).json(room);
    },
    // Deleta uma Sala
    async delete(request, response) {
        const { campus, name } = request.params;
        const roomsRepository = typeorm_1.getRepository(Rooms_1.default);
        const room = (await roomsRepository.find({ relations: ['images'] }));
        let index = 0;
        for (var key in room) {
            if (room[key].name === name && room[key].campus === campus) {
                index += 1;
                await roomsRepository.delete(room[key].id);
                const obj = {
                    status: 'Sala deletada com sucesso!'
                };
                return response.json(JSON.stringify(obj['status']));
            }
        }
        if (index === 0) {
            const obj = {
                status: 'Não encontramos nenhuma sala com este nome!'
            };
            return response.json(JSON.stringify(obj['status']));
        }
    },
    // Atualiza uma sala
    async update(request, response) {
        const { id } = request.params;
        const roomsRepository = typeorm_1.getRepository(Rooms_1.default);
        const { name, campus, latitude, longitude, description } = request.body;
        await roomsRepository.update(id, {
            name,
            campus,
            latitude,
            longitude,
            description,
        });
        const room = await roomsRepository.find();
        return response.status(201).json(room);
    },
    async showListRoom(request, response) {
        const { campus, name } = request.params;
        const roomsRepository = typeorm_1.getRepository(Rooms_1.default);
        const room = (await roomsRepository.find({ relations: ['images'] })).filter(a => a.name.startsWith(name) && a.campus === campus);
        return response.json(room_view_1.default.renderMany(room));
    },
};
