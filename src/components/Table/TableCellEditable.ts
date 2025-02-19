import { defineComponent, reactive } from "vue"

export default defineComponent({
    name: "VdtTableCellEditable",
    props: {
        data: { type: Object, required: true },
        columnKey: { type: String, required: true },
    },
    emits: ["userEvent"],
    data: () => {
        return reactive({ isEditing: false, text: "" })
    },
    methods: {
        edit() {
            this.text = this.data[this.columnKey]
            this.isEditing = true
        },
        finishEditing(confirmation: boolean) {
            this.isEditing = false

            if (confirmation === false) return

            this.$emit("userEvent", {
                action: "updateCell",
                data: this.data,
                key: this.columnKey,
                value: this.text,
            })
        },
    },
})
