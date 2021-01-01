import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '@/shared/plugins/index';
import * as firebase from 'firebase/app';
import firebaseConfig from '@/shared/plugins/firebase';

Vue.config.productionTip = !!process.env.VUE_APP_PRODUCTION;
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
