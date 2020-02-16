// import DataTableEntriesInfo from './EntriesInfo/DataTableEntriesInfo.vue';
import DataTableEntriesLength from './EntriesLength/DataTableEntriesLength.vue';
// import DataTablePagination from './Pagination/DataTablePagination.vue';
// import DataTableSearchFilter from './SearchFilter/DataTableSearchFilter.vue';
import DataTableWrapper from './Wrapper/DataTableWrapper.vue';
import defaultParameters from './defaults.js';

export default {
	name: "DataTable",

	components: {
        //DataTableEntriesInfo, DataTablePagination, DataTableSearchFilter,
        DataTableEntriesLength,
		DataTableWrapper
	 },

	computed: {
		/**
		 * Merge the parameters passed as props with the default parameters
		 * @return Object
		 */
		params() {
			return {...defaultParameters, ...this.parameters};
		},

		/**
		 * Merge the columns passed as props with the default options
		 * @return Array
		 */
		columns() {
			return this.parameters.columns.map((col, index) => {
                let attributes = {};

                if (col.orderable == null || col.orderable)
                    attributes.class = "sortable"

				return {...defaultParameters.column, ...col, index, attributes};
			})
		},

		/**
		 * get the data
		 * @return Array
		 */
		data() {
            let data = this.params.data;
            data = this.filterData(data);
            data = this.sortData(data);

            return data;
        },

        /**
         * Get the options for the length of the entries
         * @return Array
         */
        entriesLength() {
            return this.params.entriesLength
        },

        /**
         * Get the text to display in the entries length section
         * @return String
         */
        entriesLengthText() {
            return this.params.entriesLengthText
        },

		/**
		 * Get the HTML attributes of the table
		 * @return Object
		 */
		tableAttributes() {
			//let params = this.params;
			return {...this.params.tableAttributes, class: this.params.tableClass}
		},

		/**
		 * Get the HTML attributes of the table's wrapper
		 * @return Object
		 */
		tableWrapperAttributes() {
			let {tableMaxHeight: maxHeight, tableMaxWidth: maxWidth} = this.params;

			return {
				...this.params.tableWrapperAttributes, style: {maxHeight, maxWidth}
			}
		},
	},

	data() {
		return {
            sortingColumns: [],
            entryLength: this.parameters.defaultEntryLength || defaultParameters.defaultEntryLength,

		}
	},

	methods: {
		toggleSorting(column) {
			if (!column.orderable) {
				return;
			}

			if (column.attributes["data-sorting"] == null) {
				// so, we add it to our array
                column.attributes["data-sorting"] = "desc";
                column.sortIndex = this.sortingColumns.length;
				this.sortingColumns.push(column);
				return;
			}

			if (column.attributes["data-sorting"] == "desc") {
				// toggle the sorting direction
				column.attributes["data-sorting"] = "asc";
				return;
			}

			// remove it from sorting
            column.attributes["data-sorting"] = null;
            column.sortIndex = null;

            this.sortingColumns =
                this.sortingColumns
                    .filter(col => col.index != column.index)
                    .map((col, i) => {
                        col.sortIndex = i;
                        return col;
                    });
        },

        toggleEntryLength() {
            this.entryLength = Number(window.event.target.value)
        },

        filterData(data) {
            data = this.filterDataBySearch(data);
            data = this.filterDataByEntryLength(data);
            return data;
        },

        filterDataBySearch(data) {
            // for while, a provisory solution
            return data;
        },

        filterDataByEntryLength(data) {
            return data.slice(0, this.entryLength);
        },

        sortData(data) {
            if (this.sortingColumns.length == 0) {
				return data;
			}

			let keys = this.sortingColumns.map(col => col.data);
			let direction = this.sortingColumns.map(col => col.attributes["data-sorting"]);

			return _.orderBy(data, keys, direction);
        },
	},

	props: {
		parameters: {
			type: Object,
			required: true
		}
	}
};
