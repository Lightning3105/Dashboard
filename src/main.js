import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

window.APIROOT = 'http://192.168.1.6/api'

import 'vue-awesome/icons'

import Icon from 'vue-awesome/components/Icon'
// globally (in your main .js file)
Vue.component('v-icon', Icon)

new Vue({
  render: h => h(App)
}).$mount('#app')
