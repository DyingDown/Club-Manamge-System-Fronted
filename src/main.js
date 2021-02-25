import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
// import axios from 'axios'
// Vue.prototype.$http = axios

Vue.config.productionTip = false
import './theme/yellow/theme/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')