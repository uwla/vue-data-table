import exportFromJSON from "export-from-json";

export default {
	name: "DataTableExportButton",
	data() {
		return {
			selectedExport: ""
		};
	},
	methods: {
		download() {
			exportFromJSON({
				data: this.data,
				fileName: this.downloadFileName,
				exportType: this.selectedExport
			});
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
				this.selectedExport = value[0];
			},
			immediate: true
		}
	}
};
