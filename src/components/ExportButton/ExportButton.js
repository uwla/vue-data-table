import exportFromJSON from 'export-from-json'
import { mapState } from 'vuex'

export default {
    name: "DataTableExportButton",

    computed: {
        data() {
            return this.$store.getters["dataTable/dataSorted"]
        },
        ...mapState("dataTable", ["downloadFilename", "downloadText", "downloadButtonText", "allowedExports"])
    },

    data() {
        return {
            exportType: "",
        }
    },

    methods: {
        download() {
            exportFromJSON({
                data: this.data,
                fileName: this.downloadFilename,
                exportType: this.exportType
            })
        }
    },

    watch: {
        allowedExports: {
            handler(value) {
                this.exportType = value[0]
            },
            immediate: true
        }
    },
}
