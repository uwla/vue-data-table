import {mapGetters, mapState} from 'vuex'
import DataTableTr from './Tr/DataTableTr.vue'

export default {
    name: "DataTableBody",

    components: {
        DataTableTr
    },

    computed: {
        ...mapGetters('dataTable', ['data']),
        ...mapState('dataTable', ['emptyTableText']),

        isEmpty() {
            return this.data.length == 0
        },
    },
};
