export default {
    name: "VdtActionButtons",
    methods: {
        triggerAction(action) {
            this.$emit('userEvent', {
                action: action,
                data: this.data,
            })
        }
    },
    props: {
        actions: {
            type: Array,
            default: () => ['view', 'edit', 'delete']
        },
        actionIcons: {
            type: Object,
            default: () => ({
                view: "👁️",
                edit: "✏️ ",
                delete: "🗑️",
            })
        },
        data: Object
    }
}
