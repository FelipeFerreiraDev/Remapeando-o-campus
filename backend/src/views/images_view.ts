import Image from '../models/Image';

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `https://backend-remapeando-campus.herokuapp.com/uploads/${image.path}`
        };
    },

    renderMany(image: Image[]) {
        return image.map(image => this.render(image));
    }
}