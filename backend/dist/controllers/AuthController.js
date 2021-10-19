"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    async authenticate(request, response) {
        const repository = typeorm_1.getRepository(User_1.default);
        const { email, password } = request.body;
        const user = await repository.findOne({
            where: { email }
        });
        if (!user) {
            return response.status(401);
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return response.status(401);
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, 'handsonRemapeandoCampus2021CC', {
            expiresIn: '1d'
        });
        delete user.password;
        return response.json({
            user, token
        });
    }
};
