import axios from "axios";

class APIClient {

    constructor() {
        axios.defaults.baseURL = "http://localhost:3001";
        axios.interceptors.request.use(async (config) => {
            const token = await sessionStorage.getItem("token")
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config
        })
    }

    get = (url) => {
        return axios.get(url)
    }
    post = (url, data) => {
        return axios.post(url, data)
    }
    put = (url, data) => {
        return axios.put(url, data)
    }
    patch = (url, data) => {
        return axios.patch(url, data)
    }
    delete = (url) => {
        return axios.delete(url)
    }
}

export default new APIClient();


