// import DataTableEntriesInfo from './EntriesInfo/DataTableEntriesInfo.vue';
import DataTableEntriesLength from './EntriesLength/DataTableEntriesLength.vue';
import DataTablePagination from './Pagination/DataTablePagination.vue';
import DataTableSearchFilter from './SearchFilter/DataTableSearchFilter.vue';
import DataTableWrapper from './Wrapper/DataTableWrapper.vue';
import defaultParameters from './defaults.js';

export default {
	name: "DataTable",

	components: {
        //DataTableEntriesInfo,
        DataTableSearchFilter,
        DataTablePagination,
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

		numberOfPages() {
			return Math.ceil(this.params.data.length / this.entryLength)
		},

		/**
		 * get the data
		 * @return Array
		 */
		data() {
            let data = this.params.data;
            data = this.filterDataBySearch(data);
            data = this.sortData(data);
            data = this.filterDataByEntryLength(data);

            return data;
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

        entryLength() {
            if (this.currentEntryLength != null) {
                return this.currentEntryLength
            }

            let {defaultLength} = defaultParameters.entries;
            let {entries} = this.parameters

            if (entries) {
                if (entries.defaultLength) {
                    defaultLength = entries.defaultLength;
                } else if (entries.lengths) {
                    defaultLength = entries.lengths[0]
                }
            }

            return defaultLength
        }
	},

	data() {
		return {
            sortingColumns: [],
            currentPage: 1,
            currentEntryLength: null,
		}
	},

	methods: {
        toggleFiltering() {
            let {value} = window.event.target;
            console.log(value)
        },

		toggleSorting(column) {
			if (!column.orderable) {
				return;
			}

            // set the sorting direction
			if (column.attributes["data-sorting"] == null) {
                column.attributes["data-sorting"] = "desc";

                // add it to our array
                column.sortIndex = this.sortingColumns.length;
				this.sortingColumns.push(column);
				return;
			}

            // toggle the sorting direction
			if (column.attributes["data-sorting"] == "desc") {
				column.attributes["data-sorting"] = "asc";
				return;
			}

			// remove it from sorting
            column.attributes["data-sorting"] = null;
            column.sortIndex = null;

            // reset the index
            this.sortingColumns =
                this.sortingColumns.filter(col => col.index != column.index).map((col, i) => {
                    col.sortIndex = i;
                    return col;
                });
        },

        toggleEntryLength() {
            this.currentEntryLength = Number(window.event.target.value)
            this.currentPage = 1
        },

        filterDataBySearch(data) {
            // for while, a provisory solution
            return data;
        },

        filterDataByEntryLength(data) {
            let start = this.entryLength * (this.currentPage - 1);
            let end = start + this.entryLength;
            return data.slice(start, end);
        },

        sortData(data) {
            if (this.sortingColumns.length == 0) {
				return data;
			}

			let keys = this.sortingColumns.map(col => col.data);
			let direction = this.sortingColumns.map(col => col.attributes["data-sorting"]);

			return _.orderBy(data, keys, direction);
        },

        setCurrentPage(page) {
            this.currentPage = page
        },
	},

	props: {
		parameters: {
			type: Object,
			required: true
		}
	}
};
