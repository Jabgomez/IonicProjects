import axios from 'axios';

const ClienteAxios = axios.create({
    //baseURL: "http://localhost:4000/"
    baseURL: "https://he-llo-projects-server.herokuapp.com/"
});

export default ClienteAxios;