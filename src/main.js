import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import App from './App';

Vue.filter('globalnyFilter', (val) => `=>${val}<=`);

new Vue({
  el: '#app',
  components: { App },
  template: `<App />`,
});
