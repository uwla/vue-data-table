import exportFromJSON, { ExportType } from "export-from-json";
import jsPDF from "jspdf";
import { defineComponent } from "vue";

export default defineComponent({
    name: "VdtExportData",
    setup() {
        return {
            selectedExport: "",
        };
    },
    methods: {
        download() {
            if (this.selectedExport === "pdf") {
                return this.downloadPdf();
            }
            exportFromJSON({
                data: this.data as Object,
                fileName: this.downloadFileName,
                exportType: this.selectedExport as ExportType,
            });
        },
        downloadPdf() {
            const doc = new jsPDF("landscape", "pt", "a4");
            const table = (this.$refs.el as any).parentNode.querySelector(
                "table"
            );
            const { downloadFileName } = this;
            doc.html(table, {
                callback: function (doc) {
                    doc.save(downloadFileName);
                },
                x: 10,
                y: 10,
            });
        },
    },
    props: {
        data: Array,
        allowedExports: Array,
        downloadButtonText: String,
        downloadFileName: String,
        downloadText: String,
    },
    watch: {
        allowedExports: {
            handler(value) {
                this.selectedExport = value[0];
            },
            immediate: true,
        },
    },
});
