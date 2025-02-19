import { defineComponent } from "vue"

export default defineComponent({
    name: "VdtActionButtons",
    props: {
        actions: {
            type: Array as () => string[],
            default: () => ["view", "edit", "delete"],
        },
        actionIcons: {
            type: Object as () => { [key: string]: string },
            default: () => ({ view: "👁️", edit: "✏️", delete: "🗑️" }),
        },
        data: Object,
    },
    methods: {
        triggerAction(action: string) {
            this.$emit("userEvent", { action: action, data: this.data })
        },
    },
})
