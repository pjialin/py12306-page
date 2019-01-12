import axios from '../plugins/axios'

const env = window.config

const API = {
    get_user_info: () => axios.get('user/info'),
    get_menus: () => axios.get('app/menus'),
    get_actions: () => axios.get('app/actions'),
    // Login
    login: (data) => axios.post('login', data),
    get_users: () => axios.get('users'),

    get_log_realtime: (params = {}) => axios.get('log/output', {params}),
    // Query
    get_query: () => axios.get('query'),
    // Stat
    get_dashboard: () => axios.get('stat/dashboard'),
    // Help
    get_readme: () => axios.get('https://raw.githubusercontent.com/pjialin/py12306/master/README.md', {
        auth: false,
        responseType: 'text'
    }),

}

export default Object.assign(API, {
    install(Vue) {
        Vue.prototype.$api = this
    }
})
