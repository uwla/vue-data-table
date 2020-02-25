export default {
    name: "DataTableTh",

    computed: {
        attributes() {
             let attributes = {}

             if (this.column.orderable)
                 attributes.class = "sortable"
             if (this.column.sortingDirection != "")
                 attributes["data-sorting"] = this.column.sortingDirection

             return attributes
        },
    },

    methods: {
        sortThisColumn() {
            this.$store.commit('dataTable/toggleSorting', this.column)
        },
    },

    data() {
        return this.column
    },

    props: {
        column: {
            type: Object,
            required: true
        }
    }
}
