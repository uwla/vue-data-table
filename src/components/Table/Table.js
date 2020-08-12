export default {
	name: "DataTableTable",

	props: {
		tableClass: String,
		tableWrapperClass: String,
		columns: Array,
		actionMode: String,
		actionColumn: Object,
		actionColumns: Array,
		dataDisplayed: Array,
		emptyTableText: String,
		isEmpty: Boolean,
		numberOfColumns: Number,
		sortingIconComponent: Object,
		sortingIndexComponent: Object,
		unsafeHTML: Boolean
	},

	methods: {
		actionTriggered(action, data) {
			this.$emit('actionTriggered', action, data)
		}
	},
};
