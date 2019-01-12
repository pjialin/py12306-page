import store from '../../store'
import * as types from '../../store/mutation-types'
import router from '../../router/index'

let response = {
    error: function (error) {
        if (handleCode[error.response.status])
            handleCode[error.response.status](error);
    },
}

let handleCode = {
    422: function (error) {
        let text = error.response.data.msg
        store.dispatch(types.ALERT_MESSAGE, {text, type: 'error'})
    },
    400: function (error) {
        let text = error.response.data.msg
        store.dispatch(types.ALERT_MESSAGE, {text, type: 'error'})
    },
    // token 过期
    401: function (error) {
        store.dispatch(types.ALERT_MESSAGE, {text: '登录已过期，请重新登录', type: 'warning'})
        router.push('/login')
    },
    405: function (error) {
        // store.dispatch(types.ADD_NOTIFICATION, '系统错误，请重试')
    },
    500: function (error) {
        // store.dispatch(types.ADD_NOTIFICATION, '系统错误，请重试')
    }
}

export {
    response
}
