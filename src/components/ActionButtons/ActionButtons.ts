import { defineComponent } from "vue"

export default defineComponent({
    name: "VdtActionButtons",
    methods: {
        triggerAction(action: string) {
            this.$emit('userEvent', {
                action: action,
                data: this.data,
            })
        }
    },
    props: {
        actions: {
            type: Array as () => string[],
            default: () => ['view', 'edit', 'delete']
        },
        actionIcons: {
            type: Object as () => ({ [key: string]: string }),
            default: () => ({
                view: "👁️",
                edit: "✏️",
                delete: "🗑️",
            })
        },
        data: Object
    }
})