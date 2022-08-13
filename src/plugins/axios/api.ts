import axios from 'axios';
import Cookies from "js-cookie";

 const api = axios.create({
    //baseURL : "https://everyservicesapi.itpw.ru/",
    baseURL : "http://localhost:3000/",
    headers : {
        'Authorization': Cookies.get('token') ? "Bearer " + Cookies.get('token') : '' as string,
    }
});

api.interceptors.response.use(undefined, (error:any) => {
    if (error.response && error.response.status === 401) {
        return error.response;
    }
    else {
        return error.response;
    }
});

export default api