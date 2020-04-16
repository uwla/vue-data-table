import { mapState } from 'vuex'
export default {
    name: "DataTableTh",

    computed: {
        ...mapState('dataTable', ['sortIconComponent', 'sortIndexComponent']),

        attributes() {
            let attributes = {
                class: "data-table-th"
            }

            if (this.column.orderable)
                attributes.class += " sortable"
            if (this.column.sortingDirection !== "")
                attributes["data-sorting"] = this.column.sortingDirection
            return attributes
        },

        sortingIndex() {
            return this.column.sortIndex
        },
    
        isSortable() {
            return this.column.orderable
        },

        title() {
            return this.column.title
        },
    },

    methods: {
        sortThisColumn() {
            this.$store.commit('dataTable/toggleSorting', this.column)
        },
    },

    props: {
        column: {
            type: Object,
            required: true
        }
    }
}
