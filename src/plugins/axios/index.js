import axios from './config'


export default Object.assign({
    install(Vue) {
        Vue.prototype.$request = this
    }
}, axios)
