export default {
    methods: {
        triggerAction() {
            this.$emit('actionTriggered', this.action, this.data)
        }
    },

    props: {
        data: {
            type: Object,
            required: true
        },
    }
}
