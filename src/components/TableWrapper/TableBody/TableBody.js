import {mapGetters, mapState} from 'vuex'
import DataTableTr from './TableRow/TableRow.vue'

export default {
    name: "DataTableTableBody",

    components: {
        DataTableTr
    },

    computed: {
        ...mapGetters('dataTable', ['data']),
        ...mapState('dataTable', ['emptyTableText', 'columns', 'actionColumn', 'actions']),

        isEmpty() {
            return this.data.length == 0
        },

        numberOfColumns() {
            if (!this.actionColumn)
                return this.columns.length
            if (this.actionColumn === 'multiple')
                return this.columns.length + this.actions.length
            return this.columns.length + 1
        }
    },
};
