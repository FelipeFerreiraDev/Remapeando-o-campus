"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const images_view_1 = __importDefault(require("./images_view"));
exports.default = {
    render(room) {
        return {
            id: room.id,
            name: room.name,
            nameShow: room.nameShow,
            type: room.type,
            campus: room.campus,
            latitude: room.latitude,
            longitude: room.longitude,
            description: room.description,
            image: images_view_1.default.renderMany(room.images),
            link: room.link
        };
    },
    renderMany(rooms) {
        return rooms.map(room => this.render(room));
    }
};
