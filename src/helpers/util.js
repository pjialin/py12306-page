export default {
    shallow_copy(obj) {
        return JSON.parse(JSON.stringify(obj))
    },
    shallow_copy_object(obj) {
        let new_obj = {};
        for (let key in obj)
            if (typeof obj[key] == 'object') new_obj[key] = this.shallow_copy_object({...obj[key]})
            else new_obj[key] = obj[key]

        return new_obj
    },
    compare_object(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2)
    },

    // Vue Install
    install(Vue) {
        Vue.prototype.$util = this
    }
}
