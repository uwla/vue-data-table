import DataTableEntriesInfo from './EntriesInfo/DataTableEntriesInfo.vue';
import DataTableEntriesLength from './EntriesLength/DataTableEntriesLength.vue';
import DataTablePagination from './Pagination/DataTablePagination.vue';
import DataTableSearchFilter from './SearchFilter/DataTableSearchFilter.vue';
import DataTableWrapper from './Wrapper/DataTableWrapper.vue';
import defaultParameters from './defaults.js';

export const DataTable = {
    name: "DataTable",

    components: {
        DataTableEntriesInfo, DataTableSearchFilter, DataTablePagination, DataTableEntriesLength, DataTableWrapper
     },

    computed: {
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
         * get the data to be displayed
         * @return Array
         */
        data() {
            let data = this.sortData(this.filteredData);
            data = this.filterDataByEntryLength(data);
            return data;
        },

        /*
         * Get the number of records being displayed per page
         * @return Integer
         */
        entryLength() {
            // get the current entry length
            if (this.currentEntryLength != null) {
                return this.currentEntryLength
            }

            // if the current entry length has not been set
            // we will return the a default value
            let {defaultLength} = defaultParameters.entries;

            // the user may have passed a default length
            // in that case, we need to verify if he/she
            // passed the entries options in the parameters
            let {entries} = this.parameters

            if (entries) {
                if (entries.defaultLength) {
                    defaultLength = entries.defaultLength;

                // if the user provided an array of possible
                // lengths, we will return the first one as
                // the default length
                } else if (entries.lengths) {
                    defaultLength = entries.lengths[0]
                }
            }

            return defaultLength
        },

        /*
         * Get the data after filtering it
         * @return Object
         */
        filteredData() {
            return this.filterDataBySearch(this.params.data);
        },

        /*
         * Get the parameters for the EntriesInfo componennt
         * @return Object
         */
        infoParams() {
            let totalEntries = this.params.data.length;
            let firstEntry = this.entryLength * (this.currentPage - 1) + 1;
            let lastEntry = firstEntry + this.entryLength - 1;
            let filteredEntries = this.filteredData.length;

            if (lastEntry > filteredEntries) {
                lastEntry = filteredEntries
            }

            let {text, textFiltered} = this.params.info;

            return {firstEntry, lastEntry, totalEntries, filteredEntries, text, textFiltered}
        },

        /**
         * Get the number of pages
         * @return Integer
         */
        numberOfPages() {
            return Math.ceil(this.filteredData.length / this.entryLength) || 1
        },

        /*
         * Get the parameters for the Pagination componennt
         * @return Object
         */
        paginationParams() {
            let {numberOfPages, currentPage, params} = this;
            return {numberOfPages, currentPage, ...params.pagination}
        },

        /**
         * Merge the parameters passed as props with the default parameters
         * @return Object
         */
        params() {
            return {...defaultParameters, ...this.parameters};
        },

        /**
         * Get columns that can be searched
         * @return Array
         */
        searchableColumns() {
            return this.columns.filter(col => col.searchable)
        },

        /*
         * Get the parameters for the tableWrapper componennt
         * @return Object
         */
        tableWrapperParams() {
            let {data, columns} = this, {table, tableWrapper, emptyTableText} = this.params;
            return {data, columns, table, tableWrapper, emptyTableText}
        },

    },

    data() {
        let components = this.parameters.components || defaultParameters.components;

        return {
            sortingColumns: [], // which columns are being sorted
            searchText: "",
            currentPage: 1,
            currentEntryLength: null,

            // which components to show
            showEntriesInfo: components.includes("EntriesInfo"),
            showPagination: components.includes("Pagination"),
            showEntriesLength: components.includes("EntriesLength"),
            showSearchFilter: components.includes("SearchFilter"),
        }
    },

    methods: {
        /*
         * Filter the data by the current entry length and the current page.
         * @return Object
         */
        filterDataByEntryLength(data) {
            let start = this.entryLength * (this.currentPage - 1);
            let end = start + this.entryLength;
            return data.slice(start, end);
        },

        /**
         * Filter data by search text
         * @return void
         */
        filterDataBySearch(data) {
            let {searchText} = this;

            return data.filter(object => {
                return this.searchableColumns.some(col => {

                    let value = object[col.data];

                    if (typeof value == "string") {
                        return value.toLowerCase().includes(searchText.toLowerCase())
                    }

                    if (typeof value == "number") {
                        return value.toString().includes(searchText)
                    }

                    return false
                });
            });
        },

        /*
         * Set the current page of the pagination
         * @return Object
         */
        setCurrentPage(page) {
            this.currentPage = page
        },

        /**
         * Perform a case-insensitive sorting.
         * @return array
         */
        sortData(data) {
            if (this.sortingColumns.length == 0) {
                return data;
            }

            // create a copy of the data
            data = [...data]

            // get the columns to perform a multiple sort
            let columns = this.sortingColumns.map(col => {
                return {key: col.data, direction: col.attributes["data-sorting"]};
            });

            // reverse the columns, so that the first columns
            // will be the last to be sorted. This way, the first
            // columns will have more effect on the final order
            columns.reverse();

            columns.forEach(col => {
                let {key, direction} = col;

                // sort numbers
                if (typeof data[0][key] == "number") {
                    data.sort((a, b) => a[key] - b[key])

                // sort strings
                } else {
                    data.sort((a, b) => a[key].toLowerCase().localeCompare(b[key].toLowerCase()));
                }

                if (direction == "desc") {
                    data.reverse()
                }
            });

            return data;
        },

        /**
         * Toggle entry length, but still shows the records from the last entry length
         * @return void
         */
        toggleEntryLength() {
            let newEntryLength = Number(window.event.target.value);
            let firstDataIndex = 1 + this.entryLength * (this.currentPage - 1);

            this.currentEntryLength = newEntryLength;
            this.currentPage = Math.ceil(firstDataIndex / newEntryLength);
        },

        /*
         * Toggle the text used to filter data
         * @return void
         */
        toggleFiltering() {
            let {value} = window.event.target;
            this.searchText = value.trim();

            // reset the page to avoid bugs
            this.currentPage = 1;
        },

        /*
         * Toggle the direction of the column being sorted
         * @return void
         */
        toggleSorting(column) {
            if (!column.orderable) {
                return;
            }

            // set the sorting direction if none is set
            if (column.attributes["data-sorting"] == null) {
                column.attributes["data-sorting"] = "asc";

                // add it to our array of columns being sorted
                column.sortIndex = this.sortingColumns.length;
                this.sortingColumns.push(column);
                return;
            }

            // toggle the sorting direction
            if (column.attributes["data-sorting"] == "asc") {
                column.attributes["data-sorting"] = "desc";
                return;
            }

            // remove it from sorting
            column.attributes["data-sorting"] = null;
            column.sortIndex = null;

            // reset the sortIndex of all columns, which indicate
            // the priority of each column in the sorting. The lower
            // the value, the higher the priority in the sorting.
            // This number is displayed on the right side of the
            // column's title
            this.sortingColumns =
                this.sortingColumns.filter(col => col.index != column.index).map((col, i) => {
                    col.sortIndex = i;
                    return col;
                });
        },
    },

    props: {
        parameters: {
            type: Object,
            required: true
        }
    }
};

export default DataTable;
