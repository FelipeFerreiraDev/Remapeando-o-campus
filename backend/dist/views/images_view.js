"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(image) {
        return {
            id: image.id,
            url: `https://onmapsbackend.herokuapp.com/uploads/${image.path}`
        };
    },
    renderMany(image) {
        return image.map(image => this.render(image));
    }
};
