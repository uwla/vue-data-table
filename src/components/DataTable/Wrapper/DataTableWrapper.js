import {mapGetters, mapState} from 'vuex'
import store from '../store/index'

export default {
    name: "DataTableWrapper",

    beforeCreate() {
        this.$store = store
    },

    computed: {
        ...mapGetters(['data']),
        ...mapState(['table', 'tableWrapper', 'emptyTableText', 'columns']),

        isEmpty() {
            return this.data.length == 0
        },
    },

    methods: {
        sortColumn(column) {
            this.$store.commit('toggleSorting', column)
        },
    }
};
