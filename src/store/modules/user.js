import * as types from '../mutation-types'

export default {
    state: {
        user: {},
        token: null,
    },
    mutations: {
        [types.LOGIN_SUCCESS](state, data) {
            this.dispatch(types.UPDATE_TOKEN, data['access_token'])
        },
        [types.UPDATE_TOKEN](state, token) {
            localStorage.user_token = token;
            state.token = token
        },
        [types.LOAD_TOKEN](state) {
            let token;
            if (token = localStorage.getItem('user_token')) {
                state.token = token;
            }
        },
        [types.LOGOUT_SUCCESS](state) {
            delete localStorage.user_token
        },

    },
    actions: {
        [types.LOGIN_SUCCESS]({commit}, data) {
            commit(types.LOGIN_SUCCESS, data)
        },
        [types.UPDATE_TOKEN]({commit}, token) {
            commit(types.UPDATE_TOKEN, token)
        },
        [types.LOAD_TOKEN]({commit}) {
            commit(types.LOAD_TOKEN)
        },
        [types.LOGOUT_SUCCESS]({commit}) {
            commit(types.LOGOUT_SUCCESS)
        }

    },
    getters: {},
}
