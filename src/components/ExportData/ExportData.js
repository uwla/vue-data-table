import exportFromJSON from 'export-from-json'

export default {
    name: "DataTableExportButton",

    data() {
        return {
            selectedExport: "",
        }
    },

    methods: {
        download() {
            exportFromJSON({
                data: this.data,
                fileName: this.downloadFilename,
                exportType: this.selectedExport
            })
        }
    },

    props: {
        data: Array,
        allowedExports: Array,
        downloadButtonText: String,
        downloadFilename: String,
        downloadText: String,
    },

    watch: {
        allowedExports: {
            handler(value) {
                this.selectedExport = value[0]
            },
            immediate: true
        }
    },
}
