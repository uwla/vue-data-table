import {mapGetters, mapState} from 'vuex'

export default {
    name: "DataTableWrapper",

    computed: {
        ...mapGetters('dataTable', ['data']),
        ...mapState('dataTable', ['table', 'tableWrapper', 'emptyTableText', 'columns']),

        isEmpty() {
            return this.data.length == 0
        },
    },

    methods: {
        sortColumn(column) {
            this.$store.commit('dataTable/toggleSorting', column)
        },
    }
};
