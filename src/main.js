import App from "./App.vue";

import mdiVue from 'mdi-vue/v2'
import * as mdijs from '@mdi/js'

require('./bootstrap');

Vue.use(mdiVue, {
  icons: mdijs
})

// window.Vue = require('vue');
import Vue from 'vue/dist/vue'

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.config.debug = false;
// coolLightBox
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

Vue.use(CoolLightBox);
//vue-router
import VueRouter from 'vue-router'

import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(VueObserveVisibility)

Vue.use(VueRouter);
//vue-axios
import {routes} from "./routes/frontend";

import axios from 'axios'

Vue.use(axios)

import vSelect from 'vue-select';

Vue.component('v-select', vSelect);

//Vuex
import Vuex from 'vuex'
import helper from './helper'
Vue.use(Vuex);
import VuePlyr from 'vue-plyr';

Vue.use(VuePlyr, {
  plyr: {}
});

import storeData from './store/index';
import module from './store/module';

const store = new Vuex.Store({
  modules: {
    module,
    storeData
  }
});
export default store;

// import objectToFormData from "./objectToFormData";
//
// window.objectToFormData = objectToFormData;

import VueProgressBar from 'vue-progressbar'

const options = {
  color: 'var(--primary-color)',
  failedColor: '#bb2d3b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options);

import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);


// function getValueFromId(id) {
//   let value = '';
//   let input_box = document.getElementById(id);

//   if (input_box) {
//     value = input_box.value;
//   }
//   return value;
// }

// const firebaseConfig = {
//   apiKey: getValueFromId('api_key'),
//   authDomain: getValueFromId('auth_domain'),
//   projectId: getValueFromId('project_id'),
//   storageBucket: getValueFromId('storage_bucket'),
//   messagingSenderId: getValueFromId('messaging_sender_id'),
//   appId: getValueFromId('app_id'),
//   measurementId: getValueFromId('measurement_id')
// };

// Initialize Firebase
// const firebase_app = initializeApp(firebaseConfig);

const router = new VueRouter({
  mode: 'history',
  base: app_path,
  history: true,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
});

//css files 
import './assets/css/app.css'


new Vue({
  el: '#app',
  router,
  store,
  mixins: [helper],
  components: { App },
  template: '<App/>',
});

router.afterEach((to, from) => {
  if (window._gaq && window._gaq._getTracker) {
    ga('set', 'page', to.path);
    ga('send', 'pageview');
  } else if (window.urchinTracker) {
    ga('set', 'page', to.path);
    ga('send', 'pageview');
  }
});
