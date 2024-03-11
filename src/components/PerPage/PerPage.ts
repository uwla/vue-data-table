import { defineComponent } from "vue"

export default defineComponent({
    name: "VdtPerPage",
    computed: {
        textBeforeOptions() {
            return (this.perPageText.split(":entries")[0] || "").trim()
        },
        textAfterOptions() {
            return (this.perPageText.split(":entries")[1] || "").trim()
        }
    },
    methods: {
        stringNotEmpty(string: string) {
            return string !== ""
        }
    },
    props: {
        perPageText: {
            type: String,
            required: true
        },
        perPageAllText: {
            type: String,
            required: true,
        },
        currentPerPage: {
            type: [Number, String],
            required: true
        },
        perPageSizes: {
            type: Array,
            required: true
        }
    }
})