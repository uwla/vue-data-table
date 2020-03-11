import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DataTable from './components/DataTable.vue';
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
Vue.component('data-table', DataTable)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
