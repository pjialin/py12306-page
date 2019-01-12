import Axios from 'axios'
import {response} from './handle'
import store from '../../store'

const env = window.config

const config = {
    baseURL: env.API_BASE_URL
}

let axiosIns = Axios.create(config)


// Start Request
axiosIns.interceptors.request.use(function (config) {
    // config.withCredentials = true
    if (config.auth != false && store.state.user.token)
        config.headers.Authorization = 'Bearer ' + store.state.user.token
    return config
}, function (error) {
    return Promise.reject(error);
});


/** Response */
axiosIns.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    response.error(error)
    return Promise.reject(error);
});


export default axiosIns
