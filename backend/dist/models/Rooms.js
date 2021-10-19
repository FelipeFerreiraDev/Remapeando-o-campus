"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Image_1 = __importDefault(require("./Image"));
let Rooms = class Rooms {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], Rooms.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Rooms.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Rooms.prototype, "nameShow", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Rooms.prototype, "campus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Rooms.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Rooms.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Rooms.prototype, "longitude", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Rooms.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(() => Image_1.default, image => image.room, {
        cascade: ['insert', 'update']
    }),
    typeorm_1.JoinColumn({ name: 'room_id' }),
    __metadata("design:type", Array)
], Rooms.prototype, "images", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Rooms.prototype, "link", void 0);
Rooms = __decorate([
    typeorm_1.Entity('rooms')
], Rooms);
exports.default = Rooms;
