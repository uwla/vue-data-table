export default {
	name: "DataTableTable",
	props: {
		tableClass: String,
		columns: Array,
		dataDisplayed: Array,
		emptyTableText: String,
		isEmpty: Boolean,
		numberOfColumns: Number,
		sortingIconComponent: Object,
		sortingIndexComponent: Object,
	},
};
