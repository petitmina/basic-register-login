//api.js
import axios from "axios";


const api = axios.create({
    baseURL: `${process.env.REACT_APP_LOCAL_BACKEND}/api`,
    headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + sessionStorage.getItem('token'),
    },
});

api.interceptors.request.use(
    (request) => {
        return request;
    },
    function (error) {
        console.log('REQUEST ERROR', error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    function(error) {
        error = error.response.data;
        return Promise.reject(error);
    }
);

export default api;