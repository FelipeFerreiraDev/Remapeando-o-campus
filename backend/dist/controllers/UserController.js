"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    async create(request, response) {
        const repository = typeorm_1.getRepository(User_1.default);
        const { email, password } = request.body;
        const userExists = await repository.findOne({
            where: { email }
        });
        if (userExists) {
            return response.sendStatus(409);
        }
        const user = repository.create({ email, password });
        await repository.save(user);
        return response.status(201).json(user);
    }
};
