import {mapGetters, mapState} from 'vuex'
import DataTableTr from './TableRow/TableRow.vue'

export default {
    name: "DataTableTableBody",

    components: {
        DataTableTr
    },

    computed: {
        ...mapGetters('dataTable', ['data']),
        ...mapState('dataTable', ['emptyTableText', 'columns']),

        isEmpty() {
            return this.data.length == 0
        },
    },
};
