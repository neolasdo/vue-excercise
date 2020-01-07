import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

/** Import Css bootstrap, font awesome */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  fas
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './assets/custom.css'

Vue.use(BootstrapVue);
Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(fas);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
