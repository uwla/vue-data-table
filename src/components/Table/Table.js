export default {
	name: "DataTableTable",
	props: {
		tableClass: String,
		columns: Array,
		data: Array,
		dataDisplayed: Array,
		dataFiltered: Array,
		emptyTableText: String,
		footerComponent: [Object, String],
		isEmpty: Boolean,
		isLoading: Boolean,
		loadingComponent: [Object, String],
		numberOfColumns: Number,
		sortingIconComponent: Object,
		sortingIndexComponent: Object,
	},
};
