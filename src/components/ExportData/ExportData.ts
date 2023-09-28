import exportFromJSON, { ExportType } from "export-from-json"
import { defineComponent } from "vue"

export default defineComponent({
    name: "VdtExportData",
    data() {
        return {
            selectedExport: ""
        }
    },
    methods: {
        download() {
            exportFromJSON({
                data: this.data as Object,
                fileName: this.downloadFileName,
                exportType: this.selectedExport as ExportType
            })
        }
    },
    props: {
        data: Array,
        allowedExports: Array,
        downloadButtonText: String,
        downloadFileName: String,
        downloadText: String
    },
    watch: {
        allowedExports: {
            handler(value) {
                this.selectedExport = value[0]
            },
            immediate: true
        }
    }
})