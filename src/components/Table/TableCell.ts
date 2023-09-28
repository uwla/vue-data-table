import { defineComponent } from "vue"

export default defineComponent({
    name: "VdtTableCell",
    props: {
        columnKey: {
            type: String,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        }
    }
})