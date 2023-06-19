import VdtEntriesInfo from "./EntriesInfo/EntriesInfo.vue"
import VdtExportData from "./ExportData/ExportData.vue"
import VdtPagination from "./Pagination/Pagination.vue"
import VdtPerPage from "./PerPage/PerPage.vue"
import VdtSearchFilter from "./SearchFilter/SearchFilter.vue"
import VdtSortingIcon from "./SortableColumn/SortingIcon.vue"
import VdtSortingIndex from "./SortableColumn/SortingIndex.vue"
import VdtTable from "./Table/Table.vue"
import VdtTableCell from "./Table/TableCell.vue"

import {
    range,
    isNullable,
    sortDataByColumn,
    stringReplaceFromArray,
    getEventTargetValue,
} from "../helpers"
import { parseColumnProps, parseTextProps } from "../parser"

export default {
    name: "VueDataTable",
    components: {
        VdtEntriesInfo,
        VdtExportData,
        VdtPagination,
        VdtPerPage,
        VdtSearchFilter,
        VdtTable,
    },
    computed: {
        /**
         * Get the total number of columns
         * @var {Number}
         */
        numberOfColumns() {
            return this.parsedColumns.length
        },

        /**
         * Get the column that should be used in searches
         * @var {Array}
         */
        searchableColumns() {
            return this.parsedColumns.filter(column => column.searchable)
        },

        /**
         * Get the column that should be used in searches
         * @var {Array}
         */
        sortableColumns() {
            return this.parsedColumns.filter(column => column.sortable)
        },

        //
        // ─── DATA ───────────────────────────────────────────────────────────────────────
        //

        /**
         * The data displayed in the current table page
         * @var {Array}
         */
        dataDisplayed() {
            const { lastEntry, firstEntry, dataSorted } = this
            // we need to subtract 1 due to array index
            // we need also to subtract 1 for the first
            // item to appear
            const end = lastEntry
            const start = Math.max(0, firstEntry - 1)
            return dataSorted.slice(start, end)
        },

        /**
         * The data filtered by search text
         * @var {Array}
         */
        dataFiltered() {
            const { searchableColumns, data, search } = this
            if (isNullable(search)) {
                return data
            }
            return data.filter(function(row) {
                return searchableColumns.some(function(column) {
                    const cell = column.key,
                        value = row[cell]
                    if (typeof value === "string") {
                        return value
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    }
                    if (typeof value === "number") {
                        return value.toString().includes(search)
                    }
                    return false
                })
            })
        },

        /**
         * The data after sorting it by the desirable columns
         * @var {Array}
         */
        dataSorted() {
            var { dataFiltered: data, columnsBeingSorted } = this

            // do not sort if there is no rows or no data to sort
            if (columnsBeingSorted.length === 0 || data.length === 0) {
                return data
            }

            // create a copy of data and columns
            data = [...data]
            var columns = [...columnsBeingSorted]

            // reverse the columns, so that the first columns
            // will be the last to be sorted. Doing this, we
            // can sort by multiple columns in such way that
            // the columns that were select first will have
            // priority in the process.
            columns.reverse()
            columns.forEach(column => sortDataByColumn(data, column))
            return data
        },

        /**
         * Indicates if there are no rows to shown
         * @var {Boolean}
         */
        isEmpty() {
            return this.dataDisplayed.length === 0
        },

        //
        // ─── PER PAGE ───────────────────────────────────────────────────────────────────
        //

        /**
         * Get the index of the first record being displayed in the current page
         * @var {Integer}
         */
        firstEntry() {
            const { dataFiltered, currentPerPage, currentPage } = this
            if (dataFiltered.length === 0) {
                return 0
            }
            return currentPerPage * (currentPage - 1) + 1
        },

        /**
         * Get the index of the last record being displayed in the current page
         * @var {Integer}
         */
        lastEntry() {
            return Math.min(
                this.filteredEntries,
                this.firstEntry + this.currentPerPage - 1
            )
        },

        /**
         * Get the number of records
         * @var {Integer}
         */
        totalEntries() {
            return this.data.length
        },

        /**
         * Get the number of records
         * @var {Integer}
         */
        filteredEntries() {
            return this.dataFiltered.length
        },

        /**
         * The text containing how many rows are being shown
         * @var {String}
         */
        entriesInfoText() {
            const {
                infoText,
                infoFilteredText,
                firstEntry,
                lastEntry,
                filteredEntries,
                totalEntries
            } = this
            const replacements = [
                firstEntry,
                lastEntry,
                filteredEntries,
                totalEntries
            ]
            const searchValues = [":first", ":last", ":filtered", ":total"]
            var text = infoText
            if (totalEntries !== filteredEntries) {
                text = infoFilteredText
            }
            // we take the text provided by the user, then
            // replace the placeholders with the actual
            // values, and return the result
            return stringReplaceFromArray(text, searchValues, replacements)
        },
        //
        // ─── PAGINATION ─────────────────────────────────────────────────────────────────
        //

        /**
         * Get the number of pages
         * @var {Number}
         */
        numberOfPages() {
            return Math.max(
                Math.ceil(this.filteredEntries / this.currentPerPage),
                1
            )
        },

        /**
         * Alias for the number of pages
         * @var {Number}
         */
        lastPage() {
            return this.numberOfPages
        },

        /**
         * Whether this is the last page of the table
         * @var {Boolean}
         */
        isLastPage() {
            return this.currentPage === this.numberOfPages
        },

        /**
         * Whether this is the first page of the table
         * @var {Boolean}
         */
        isFirstPage() {
            return this.currentPage === 1
        },

        /**
         * Get the number of the previous page
         * @var {Number}
         */
        previousPage() {
            return this.currentPage - 1
        },

        /**
         * Get the number of the next page
         * @var {Number}
         */
        nextPage() {
            return this.currentPage + 1
        },

        /**
         * Get the text to be shown in pagination menu
         * @var {Array}
         */
        pagination() {
            // extract the variables from "this"
            // so we don't have to type this.prop
            // every time we access it.
            const { lastPage, currentPage, nextPage, previousPage } = this
            if (lastPage === 1) {
                return [1]
            }
            if (lastPage <= 7) {
                return range(1, lastPage)
            }
            if (lastPage > 7 && currentPage <= 4) {
                return [1, 2, 3, 4, 5, "...", lastPage]
            }
            if (lastPage > 8 && lastPage > currentPage + 3) {
                return [
                    1,
                    "...",
                    previousPage,
                    currentPage,
                    nextPage,
                    "...",
                    lastPage
                ]
            }
            if (lastPage > 7 && lastPage <= currentPage + 3) {
                return [
                    1,
                    "...",
                    lastPage - 3,
                    lastPage - 2,
                    lastPage - 1,
                    lastPage
                ]
            }
        },

        //
        // ─── BINDINGS ────────────────────────────────────────────────────
        //

        /**
         * The props for the PerPage component
         * @var {Object}
         */
        propsPerPage() {
            return {
                currentPerPage: this.currentPerPage,
                perPageSizes: this.perPageSizes,
                perPageText: this.perPageText,
            }
        },

        /**
         * The props for the SearchFilter component
         * @var {Object}
         */
        propsSearchFilter() {
            return {
                search: this.search,
                searchText: this.searchText,
            }
        },

        /**
         * The props for the Table component
         * @var {Object}
         */
        propsTable() {
            return {
                columns: this.parsedColumns,
                data: this.data,
                dataDisplayed: this.dataDisplayed,
                dataFiltered: this.dataFiltered,
                emptyTableText: this.emptyTableText,
                footerComponent: this.footerComponent,
                isEmpty: this.isEmpty,
                isLoading: this.isLoading,
                loadingComponent: this.loadingComponent,
                numberOfColumns: this.numberOfColumns,
                sortingIconComponent: this.sortingIconComponent,
                sortingIndexComponent: this.sortingIndexComponent,
                tableClass: this.tableClass,
            }
        },

        /**
         * The props for the EntriesInfo component
         * @var {Object}
         */
        propsEntriesInfo() {
            return {
                entriesInfoText: this.entriesInfoText
            }
        },

        /**
         * The props for the Pagination component
         * @var {Object}
         */
        propsPagination() {
            return {
                currentPage: this.currentPage,
                isFirstPage: this.isFirstPage,
                isLastPage: this.isLastPage,
                nextButtonText: this.nextButtonText,
                nextPage: this.nextPage,
                numberOfPages: this.numberOfPages,
                pagination: this.pagination,
                paginationSearchButtonText: this.paginationSearchButtonText,
                paginationSearchText: this.paginationSearchText,
                previousButtonText: this.previousButtonText,
                previousPage: this.previousPage,
            }
        },

        /**
         * The props for the DownloadButton component
         * @var {Object}
         */
        propsExportData() {
            return {
                allowedExports: this.allowedExports,
                data: this.dataDisplayed,
                downloadButtonText: this.downloadButtonText,
                downloadFileName: this.downloadFileName,
                downloadText: this.downloadText,
            }
        }
    },

    mounted() {
        this.setDefaults()
    },

    data() {
        return {
            currentPage: 1,
            currentPerPage: 10,
            parsedColumns: [],
            columnsBeingSorted: [],
            perPageText: "",
            downloadText: "",
            downloadButtonText: "",
            emptyTableText: "",
            infoText: "",
            infoFilteredText: "",
            nextButtonText: "",
            previousButtonText: "",
            paginationSearchText: "",
            paginationSearchButtonText: "",
            search: "",
            searchText: ""
        }
    },

    methods: {
        /**
         * Propage upwards an event from a user custom component
         *
         * @returns {void}
         */
        emitUserEvent(payload) {
            this.$emit('userEvent', payload)
        },

        /**
         * Indicates if a page is valid
         * @param {Object} props
         * @returns {Boolean}
         */
        isValidPage(page) {
            return (
                typeof page === "number" &&
                page <= this.numberOfPages &&
                page > 0 &&
                page !== this.currentPage
            )
        },
        /**
         * Parse columns (assign default values while enabling customization)
         * @returns {void}
         */
        parseColumnProps() {
            var parsedColumns = parseColumnProps(this.$props)
            Object.assign(this, { parsedColumns })
        },

        /**
         * Parse the text (choose correct translation while enabling custom text)
         * @returns {void}
         */
        parseTextProps() {
            Object.assign(this, parseTextProps(this.$props))
        },

        /**
         * Toggle the sorting state of the given column.
         *
         * This actually does not sort the column, but only set the state of the
         * column, as well as the state of the other columns affected by it.
         *
         * @param {Object} column
         * @returns {void}
         */
        sortColumn(column) {
            // column is not sortable, ignore it
            if (!column.sortable) {
                return
            }

            // case when the current mode is to only sort a single column
            if (this.sortingMode === "single") {

                // mark other columns as not being sorted
                // skipping the current column
                for (let col of this.sortableColumns) {
                    if (col.id !== column.id) {
                        col.sortingMode = ""
                        col.sortingIndex = -1
                    }
                }

                // the column is not being sorted
                // so, mark it as sorted in ascending mode
                if (column.sortingMode === "") {
                    column.sortingMode = "asc"
                    this.columnsBeingSorted = [column]
                    return
                }

                // the column is being sorted in ascending mode
                // so, mark it as sorted in descending mode
                if (column.sortingMode === "asc") {
                    column.sortingMode = "desc"
                    this.columnsBeingSorted = [column]
                    return
                }

                // column is being sorted in descending mode
                // so, mark it as not being sorted
                column.sortingMode = ""
                this.columnsBeingSorted = []
                return
            }

            // column is not being sorted
            // so, mark it as sorted in ascending mode
            if (column.sortingMode === "") {
                column.sortingMode = "asc"
                column.sortingIndex = this.columnsBeingSorted.length + 1
                this.columnsBeingSorted.push(column)
                return
            }

            // column is being sorted in ascending mode
            // so, mark it as sorted in descending mode
            if (column.sortingMode === "asc") {
                column.sortingMode = "desc"
                this.columnsBeingSorted.splice(
                    column.sortingIndex - 1,
                    1,
                    column
                )
                return
            }

            // column is being sorted in descending mode
            // so, mark it as not being sorted
            column.sortingMode = ""
            column.sortingIndex = -1
            this.columnsBeingSorted = this.columnsBeingSorted.filter(function(c) {
                return c.id !== column.id
            })

            // in this case,
            // it is necessary to update the sorting index of other columns
            // to reflect the fact that there is one less column.
            this.columnsBeingSorted.forEach(function(col, i) {
                col.sortingIndex = i + 1
            })
        },

        /**
         * Set the default values of some attributes
         * @returns {void}
         */
        setDefaults() {
            this.setPerPage(this.defaultPerPage)
        },

        /**
         * Set the current page being displayed
         * @param {Number}
         * @returns {void}
         */
        setPage(value) {
            if (this.isValidPage(value)) {
                this.currentPage = value
            }
        },

        /**
         * Set the current rows per page
         * @param {Number}
         * @returns {void}
         */
        setPerPage(value) {
            var previousFirstEntry, newPerPage, newCurrentPage
            // before updating the value of currentPerPage,
            // we need to store the current firstEntry.
            // We will use it to change the current page.
            previousFirstEntry = this.firstEntry
            newPerPage = this.currentPerPage

            if (!this.perPageSizes.includes(newPerPage)) {
                newPerPage = this.perPageSizes[0]
            }
            if (this.perPageSizes.includes(value)) {
                newPerPage = value
            }
            this.currentPerPage = newPerPage

            // update current per page so that
            // the user will see the same first
            // rows that were being displayed
            newCurrentPage = Math.floor(previousFirstEntry / newPerPage) + 1
            this.setPage(newCurrentPage)
        },

        /**
         * Set the current rows per page from the user input
         * @param {Number}
         * @returns {void}
         */
        setPerPageFromUserInput() {
            const value = Number(getEventTargetValue())
            this.setPerPage(value)
        },

        /**
         * Set the value being searched
         * @param {String}
         * @returns {void}
         */
        setSearch() {
            const value = getEventTargetValue() || ""
            this.search = value.trim()
            this.currentPage = 1
        }
    },

    props: {
        allowedExports: {
            type: Array,
            default: () => ["csv", "json", "txt"]
        },
        columns: {
            type: Array,
            required: false
        },
        columnKeys: {
            type: Array,
            required: false
        },
        data: {
            type: Array,
            required: true
        },
        defaultColumn: {
            type: Object,
            required: false,
            default: function() {
                return {
                    component: VdtTableCell,
                    componentProps: {},
                    index: 0,
                    searchable: true,
                    sortable: true,
                    type: "string",
                }
            }
        },
        defaultPerPage: {
            type: Number,
            default: 10
        },
        downloadFileName: {
            type: String,
            default: "download",
        },
        footerComponent: {
            type: [Object, String],
            default: null
        },
        perPageSizes: {
            type: Array,
            default: () => [10, 25, 50, 100]
        },
        lang: {
            type: String,
            default: "en"
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
        loadingComponent: {
            type: [Object, String],
            default: () => "",
        },
        showEntriesInfo: {
            type: Boolean,
            default: true
        },
        showPerPage: {
            type: Boolean,
            default: true
        },
        showDownloadButton: {
            type: Boolean,
            default: true
        },
        showPagination: {
            type: Boolean,
            default: true
        },
        showSearchFilter: {
            type: Boolean,
            default: true
        },
        sortingMode: {
            type: String,
            default: "multiple",
            validator: value => ["multiple", "single", "disabled"].includes(value)
        },
        sortingIndexComponent: {
            type: Object,
            default: function() {
                return VdtSortingIndex
            }
        },
        sortingIconComponent: {
            type: Object,
            default: function() {
                return VdtSortingIcon
            }
        },
        tableClass: {
            type: String,
            default: "table table-striped table-hover"
        },
        text: {
            type: Object,
            required: false
        }
    },
    watch: {
        columns: {
            handler: "parseColumnProps",
            deep: true,
            immediate: true
        },
        columnKeys: {
            handler: "parseColumnProps",
            deep: true,
            immediate: true
        },
        text: {
            handler: "parseTextProps",
            deep: true,
            immediate: true
        },
        lang: {
            handler: "parseTextProps"
        }
    }
}
