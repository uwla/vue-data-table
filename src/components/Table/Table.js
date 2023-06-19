export default {
    name: "VueDataTableTable",
    methods: {
        /**
         * Propage upwards an event from a user custom component
         *
         * @returns {void}
         */
        emitUserEvent(payload) {
            this.$emit('user-event', payload)
        },
    },
    props: {
        tableClass: String,
        columns: Array,
        data: Array,
        dataDisplayed: Array,
        dataFiltered: Array,
        emptyTableText: String,
        footerComponent: [Object, String],
        isEmpty: Boolean,
        isLoading: Boolean,
        loadingComponent: [Object, String],
        numberOfColumns: Number,
        sortingIconComponent: Object,
        sortingIndexComponent: Object,
    },
};
