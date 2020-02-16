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
        tableAttributes: {
            type: Object,
            required: true,
        },
        tableWrapperAttributes: {
            type: Object,
            required: true,
        },
    },

    methods: {
        toggleSorting(col) {

        },
    }
};
