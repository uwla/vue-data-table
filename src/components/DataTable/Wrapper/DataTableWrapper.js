export default {
    name: "DataTableWrapper",

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
    },

    methods: {
        // toggleSorting(col) {

        // },
    }
};
