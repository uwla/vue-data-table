import { defineComponent, reactive } from "vue"

export default defineComponent({
    name: "VdtTableCellSelectable",
    props: { data: { type: Object, required: true } },
    emits: ["userEvent"],
    data: () => {
        return reactive({ selected: false })
    },
    methods: {
        handleChange() {
            this.$emit("userEvent", {
                action: "select",
                data: this.data,
                selected: this.selected,
                checked: this.selected, // avoid confusion
            })
        },
    },
})
