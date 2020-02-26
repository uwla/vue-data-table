export default {
    methods: {
        triggerAction() {
            DataTableEventBus.$emit(this.action + "Data", this.data)
        }
    },

    props: {
        data: {
            type: Object,
            required: true
        },
    }
}
