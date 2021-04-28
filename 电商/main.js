import Vue from 'vue'
import App from './App'
import req from 'utils/index'


Vue.config.productionTip = false
Vue.prototype.req=req;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
