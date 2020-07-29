export default {
	name: "DataTableTable",

	props: {
		tableClass: String,
		tableWrapperClass: String,
		columns: Array,
		actionMode: String,
		actionColumns: Array,
		dataDisplayed: Array,
		emptyTableText: String,
		isEmpty: Boolean,
		numberOfColumns: Number,
		sortingIconComponent: Object,
		sortingIndexComponent: Object,
	},
};
