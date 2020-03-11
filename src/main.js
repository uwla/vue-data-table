import DataTable from './components/DataTable.vue';
import DataTableStore from './store/index'

import Vue from 'vue'
window.DataTableEventBus = new Vue()

export {
    DataTable,
    DataTableStore,
	DataTable as default
}
