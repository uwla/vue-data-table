export default {
    name: "DataTableWrapper",

    computed: {
        tableAttributes() {
            return this.attributes.tableAttributes;
        },

        tableWrapperAttributes() {
            return this.attributes.tableWrapperAttributes;
        },
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
        attributes: {
            type: Object,
            required: true,
        }
    },

    methods: {
        toggleSorting(col) {

        },
    }
};
