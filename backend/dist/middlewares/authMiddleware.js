"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddlewares(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.sendStatus(401);
    }
    const token = authorization.replace('Bearer', '').trim();
    try {
        const data = jsonwebtoken_1.default.verify(token, 'handsonRemapeandoCampus2021CC');
        const { id } = data;
        request.userId = id;
        return next();
    }
    catch (err) {
        return response.sendStatus(401);
    }
}
exports.default = authMiddlewares;
