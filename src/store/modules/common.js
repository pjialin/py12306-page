import * as types from '../mutation-types'
import {Message} from 'element-ui'

export default {
    state: {
        sidebar: true,
    },
    mutations: {
        [types.TOGGLE_SIDEBAR](state, status) {
            status = status ? status : !state.sidebar
            localStorage.sidebar = status;
            state.sidebar = status
        },
        [types.ALERT_NOTIFICATION](state, notification) {
        },
        [types.ALERT_MESSAGE](state, {text, type = 'info'}) {
            Message({
                message: text,
                type: type
            })
        },
    },
    actions: {
        [types.TOGGLE_SIDEBAR]({commit}, data) {
            commit(types.TOGGLE_SIDEBAR, data)
        },
        [types.ALERT_MESSAGE]({commit}, data) {
            commit(types.ALERT_MESSAGE, data)
        },
    },
    getters: {},
}
