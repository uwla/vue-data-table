export default {
	name: "DataTablePerPage",
	computed: {
		textBeforeOptions() {
			return this.perPageText.split(":entries")[0].trim();
		},
		textAfterOptions() {
			return (this.perPageText.split(":entries")[1] || "").trim();
		}
	},
	methods: {
		stringNotEmpty(string) {
			return string !== "";
		}
	},
	props: {
		perPageText: {
			type: String,
			required: true
		},
		currentPerPage: {
			type: Number,
			required: true
		},
		perPageSizes: {
			type: Array,
			required: true
		}
	}
};
