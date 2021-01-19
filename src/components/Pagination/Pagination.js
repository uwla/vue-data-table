export default {
	name: "DataTablePagination",
	data() {
		return {
			pageToGo: 1
		};
	},
	methods: {
		setCurrentPage(page) {
			this.$emit("set-page", Number(page));
		}
	},
	props: {
		paginationSearchButtonText: String,
		paginationSearchText: String,
		previousButtonText: String,
		nextButtonText: String,
		isFirstPage: Boolean,
		isLastPage: Boolean,
		numberOfPages: Number,
		previousPage: Number,
		currentPage: Number,
		nextPage: Number,
		pagination: Array
	},
	watch: {
		currentPage(value) {
			this.pageToGo = value;
		},
		pageToGo(value) {
			if (value > this.numberOfPages) {
				return this.numberOfPages;
			}
			if (value < 1) {
				return 1;
			}
			return value;
		}
	}
};
