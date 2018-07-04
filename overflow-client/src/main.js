import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vueditor from 'vueditor'
import Vuelidate from 'vuelidate'
import 'vueditor/dist/style/vueditor.min.css'
import './helpers/fbsdk'
// import firebase from 'firebase/app'
// import firebaseui from 'firebaseui'
// import { config } from './helpers/firebaseConfig'

let configVueditor = {
  toolbar: [
    'removeFormat', 'undo', 'redo', '|', 'code', 'element', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough',
    'link', 'unLink', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
    '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'table'
  ]
}

axios.defaults.baseURL = 'http://localhost:4000'

Vue.use(Vueditor, configVueditor)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
