import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const config = {
  position: 'top-right'
};

Vue.use(VueToast, config);
