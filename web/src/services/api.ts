import axios from 'axios';

const api = axios.create({
    baseURL: "https://onmapsbackend.herokuapp.com/",
})

export default api;