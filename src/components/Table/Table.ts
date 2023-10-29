import { defineComponent } from "vue"

export default defineComponent({
    name: "VdtTable",
    methods: {
        // Propagate upwards an event from a user custom component
        emitUserEvent(payload: any) {
            this.$emit('user-event', payload)
        },
    },
    props: {
        tableClass: String,
        columns: Array as () => any,
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
})