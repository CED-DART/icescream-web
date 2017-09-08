import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'

import { store } from './store'
import Alert from './components/Shared/Alert.vue'
import ConfirmDialog from './components/Shared/ConfirmDialog.vue'
import DateFilter from './filters/date'
import PhoneFilter from './filters/phone'
import MoneyFilter from './filters/money'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('app-alert', Alert)
Vue.component('app-confirm-dialog', ConfirmDialog)

Vue.filter('date', DateFilter)
Vue.filter('phone', PhoneFilter)
Vue.filter('money', MoneyFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
