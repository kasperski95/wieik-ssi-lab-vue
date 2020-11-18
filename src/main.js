import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import mojKomponent from './App';

new Vue({
  el: '#app',
  components: { wlasny: mojKomponent },
  template: `
  <div class="text-center">
    <h1 class="bg-primary text-white p-3">
      To jest główny plik main.js
    </h1>
    <wlasny />
  </div>
  `,
});
