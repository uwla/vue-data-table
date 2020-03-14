import DataTable from './components/DataTable.vue';
import DataTableStore from './store/'

export default function install(Vue, store) {
    window.DataTableEventBus = new Vue()

    if (!store)
        console.error('Please provide a store!!')

    Vue.component('data-table', DataTable)

    store.registerModule('dataTable', DataTableStore)
}
