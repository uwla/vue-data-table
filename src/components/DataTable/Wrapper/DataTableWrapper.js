export default {
    name: "DataTableWrapper",

    computed: {
        empty() {
            return this.data.length == 0
        }
    },

    props: {
        data: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true,
        },
        table: {
            type: Object,
            required: true,
        },
        tableWrapper: {
            type: Object,
            required: true,
        },
        emptyTableText: {
            type: String,
            required: true
        }
    },

    methods: {
        // toggleSorting(col) {

        // },
    }
};
