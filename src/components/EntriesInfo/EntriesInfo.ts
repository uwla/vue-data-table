import { defineComponent } from "vue"

export default defineComponent({
    name: "VdtEntriesInfo",
    props: {
        entriesInfoText: {
            type: String,
            required: true
        }
    }
})