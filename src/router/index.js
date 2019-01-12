import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {LOAD_TOKEN} from "../store/mutation-types"

// Layout
import LAYOUT_APP from '../views/layouts/app'
import HOME_INDEX from '../views/home/index'

import USER_LOGIN from '../views/user/login'
import USER_INDEX from '../views/user/index'

import LOG_REALTIME from '../views/log/realtime'

import QUERY_INDEX from '../views/query/index'

import HELP_INDEX from '../views/help/index'
import HELP_README from '../views/help/readme'

Vue.use(Router)

const routes = [
    {
        path: '/',
        component: LAYOUT_APP,
        meta: {
            auth: true
        },
        children: [
            {path: '', component: HOME_INDEX},

            {path: 'user', component: USER_INDEX},

            {path: 'log/realtime', component: LOG_REALTIME},

            {path: 'query', component: QUERY_INDEX},

            {path: 'help', component: HELP_INDEX},
            {path: 'help/readme', component: HELP_README},
        ],

    },
    {path: '/login', component: USER_LOGIN},
]

store.dispatch(LOAD_TOKEN) // 加载 token


const router = new Router({
    // mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.auth)) {
        if (store.state.user.token) next()
        else next({path: '/login', query: {redirect: to.fullPath}})
    } else next()
})

export default router
