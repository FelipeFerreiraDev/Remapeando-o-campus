import Room from '../models/Rooms';

import imagesView from './images_view';

export default {
    render(room: Room) {
        return {
            id: room.id,
            name: room.name,
            nameShow: room.nameShow,
            type: room.type,
            campus: room.campus,
            latitude: room.latitude,
            longitude: room.longitude,
            description: room.description,
            image: imagesView.renderMany(room.images),
            link: room.link,
            piso: room.piso
        };
    },

    renderMany(rooms: Room[]) {
        return rooms.map(room => this.render(room));
    }
}