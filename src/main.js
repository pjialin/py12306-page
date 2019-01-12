// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store'
import router from './router'

import Util from './helpers/util'
import Api from './helpers/api'
import App from './App'

Vue.use(ElementUI)
Vue.use(Util)
Vue.use(Api)

import VChartLine from 'v-charts/lib/line.common'
import VChartHistogram from 'v-charts/lib/histogram.common'
// Vue.use(VCharts)
Vue.component(VChartLine.name, VChartLine)
Vue.component(VChartHistogram.name, VChartHistogram)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
