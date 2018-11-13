import Vue from 'vue'
import ElementUI from 'element-ui' //新添加
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import ipcRender from './public/ipcRenderer'

import  './css/index.css'
import  './css/home.css'
import  './css/color.css'

import  './css/found.css'       //发现
import  './css/recommend.css'   //推荐
import  './css/rankingList.css' //排行榜
import  './css/songlist.css'    //歌单
import  './css/radio.css'       //电台
import  './css/album.css'       //专辑

Vue.use(ipcRender)
Vue.use(ElementUI) //新添加

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
