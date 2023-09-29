import VdtEntriesInfo from "./EntriesInfo/EntriesInfo.vue"
import VdtExportData from "./ExportData/ExportData.vue"
import VdtPagination from "./Pagination/Pagination.vue"
import VdtPerPage from "./PerPage/PerPage.vue"
import VdtSearchFilter from "./SearchFilter/SearchFilter.vue"
import VdtSortingIcon from "./SortableColumn/SortingIcon.vue"
import VdtSortingIndex from "./SortableColumn/SortingIndex.vue"
import VdtTable from "./Table/Table.vue"

import {
    range,
    isNullable,
    sortDataByColumns,
    stringReplaceFromArray,
    getEventTargetValue,
} from "../utils"
import { parseColumnProps, parseTextProps } from "../parser"

import { defineComponent, reactive } from "vue"
import { SORTING_MODE } from "@/const"

export default defineComponent({
    name: "VueDataTable",

    components: {
        VdtEntriesInfo,
        VdtExportData,
        VdtPagination,
        VdtPerPage,
        VdtSearchFilter,
        VdtTable,
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
            required: true,
        },
        defaultColumn: {
            type: Object,
            required: false,
            default: () => ({})
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
            validator: (value: string) => {
                return ["multiple", "single", "none"].includes(value)
            }
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

    data: () => {
        return reactive({
            currentPage: 1,
            currentPerPage: 10,
            parsedColumns: [] as Column[],
            columnsBeingSorted: [] as Column[],
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
        })
    },

    computed: {
        /**
         * Get the total number of columns
         */
        numberOfColumns() {
            return this.parsedColumns.length
        },

        /**
         * Get the column that should be used in searches
         */
        searchableColumns() {
            return this.parsedColumns.filter((column : Column) => column.searchable)
        },

        /**
         * Get the column that should be used in searches
         */
        sortableColumns() {
            return this.parsedColumns.filter((column : Column) => column.sortable)
        },

        //
        // ─── DATA ────────────────────────────────────────────────────────────
        //

        /**
         * The data displayed in the current table page
         */
        dataDisplayed() {
            const { lastEntry, firstEntry, dataSorted } = this
            const end = lastEntry
            const start = Math.max(0, firstEntry - 1)
            return dataSorted.slice(start, end)
        },

        /**
         * The data filtered by search text
         */
        dataFiltered() {
            const { data, searchableColumns, search } = this
            if (isNullable(search)) {
                return data
            }
            return data.filter(function(row: any) {
                return searchableColumns.some(function(column: Column) {
                    return column.searchFunction(row, search, column.key)
                })
            })
        },

        /**
         * The data after sorting it by the desirable columns
         */
        dataSorted() {
            var { dataFiltered: data, columnsBeingSorted } = this

            // do not sort if there is no rows or no data to sort
            if (columnsBeingSorted.length === 0 || data.length === 0) {
                return data
            }

            return sortDataByColumns(data as Data, columnsBeingSorted)
        },

        /**
         * Indicates if there are no rows to shown
         */
        isEmpty() {
            return this.dataDisplayed.length === 0
        },

        //
        // ─── PER PAGE ────────────────────────────────────────────────────────
        //

        /**
         * Get the index of the first record being displayed in the current page
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
         */
        lastEntry() {
            return Math.min(
                this.filteredEntries,
                this.firstEntry + this.currentPerPage - 1
            )
        },

        /**
         * Get the number of records
         */
        totalEntries() {
            return this.data.length
        },

        /**
         * Get the number of records
         */
        filteredEntries() {
            return this.dataFiltered.length
        },

        /**
         * The text containing how many rows are being shown
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
        // ─── PAGINATION ──────────────────────────────────────────────────────
        //

        /**
         * Get the number of pages
         */
        numberOfPages() {
            return Math.max(
                Math.ceil(this.filteredEntries / this.currentPerPage),
                1
            )
        },

        /**
         * Alias for the number of pages
         */
        lastPage() {
            return this.numberOfPages
        },

        /**
         * Whether this is the last page of the table
         */
        isLastPage() {
            return this.currentPage === this.numberOfPages
        },

        /**
         * Whether this is the first page of the table
         */
        isFirstPage() {
            return this.currentPage === 1
        },

        /**
         * Get the number of the previous page
         */
        previousPage() {
            return this.currentPage - 1
        },

        /**
         * Get the number of the next page
         */
        nextPage() {
            return this.currentPage + 1
        },

        /**
         * Get the text to be shown in pagination menu
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

        // ─────────────────────────────────────────────────────────────────────
        //

        /**
         * The props for the PerPage component
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
         */
        propsSearchFilter() {
            return {
                search: this.search,
                searchText: this.searchText,
            }
        },

        /**
         * The props for the Table component
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
         */
        propsEntriesInfo() {
            return {
                entriesInfoText: this.entriesInfoText
            }
        },

        /**
         * The props for the Pagination component
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

    methods: {
        /**
         * Propagate upwards an event from user's custom component
         */
        emitUserEvent(payload: any) {
            this.$emit('userEvent', payload)
        },

        /**
         * Indicates if a page is valid
         */
        isValidPage(page: any) : boolean {
            return (
                typeof page === "number" &&
                page <= this.numberOfPages &&
                page > 0 &&
                page !== this.currentPage
            )
        },

        /**
         * Parse columns (assign default values while enabling customization)
         */
        parseColumnProps() {
            this.parsedColumns = parseColumnProps(this.$props)
        },

        /**
         * Parse the text (choose correct translation while enabling custom text)
         */
        parseTextProps() {
            Object.assign(this, parseTextProps(this.$props))
        },

        /**
         * Toggle the sorting state of the given column.
         *
         * This actually does not sort the column, but only set the state of the
         * column, as well as the state of the other columns affected by it.
         */
        sortColumn(column: Column) {
            // column is not sortable, ignore it
            if (!column.sortable) {
                return
            }

            if (this.sortingMode === "none") {
                return
            }

            // case when the current mode is to only sort a single column
            if (this.sortingMode === "single") {

                // mark other columns as not being sorted
                // skipping the current column
                for (let col of (this.sortableColumns as Column[])) {
                    if (col.id !== column.id) {
                        col.sortingMode = SORTING_MODE.NONE
                        col.sortingIndex = -1
                    }
                }

                // the column is not being sorted
                // so, mark it as sorted in ascending mode
                if (column.sortingMode === SORTING_MODE.NONE) {
                    column.sortingMode = SORTING_MODE.ASC
                    this.columnsBeingSorted = [column] as any
                    return
                }

                // the column is being sorted in ascending mode
                // so, mark it as sorted in descending mode
                if (column.sortingMode === SORTING_MODE.ASC) {
                    column.sortingMode = SORTING_MODE.DESC
                    this.columnsBeingSorted = [column] as any
                    return
                }

                // column is being sorted in descending mode
                // so, mark it as not being sorted
                column.sortingMode = SORTING_MODE.NONE
                this.columnsBeingSorted = []
                return
            }

            // column is not being sorted
            // so, mark it as sorted in ascending mode
            if (column.sortingMode === SORTING_MODE.NONE) {
                column.sortingMode = SORTING_MODE.ASC
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
            column.sortingMode = SORTING_MODE.NONE
            column.sortingIndex = -1
            this.columnsBeingSorted = this.columnsBeingSorted.filter((c: Column) => {
                return c.id !== column.id
            })

            // in this case,
            // it is necessary to update the sorting index of other columns
            // to reflect the fact that there is one less column.
            this.columnsBeingSorted.forEach(function(col: Column, i: number) {
                col.sortingIndex = i + 1
            })
        },

        /**
         * Set the default values of some attributes
         */
        setDefaults() {
            this.setPerPage(this.defaultPerPage)
        },

        /**
         * Set the current page being displayed
         */
        setPage(value: any) {
            if (this.isValidPage(value)) {
                this.currentPage = value
            }
        },

        /**
         * Set the current rows per page
         */
        setPerPage(value: any) {
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
         */
        setPerPageFromUserInput() {
            const value = Number(getEventTargetValue())
            this.setPerPage(value)
        },

        /**
         * Set the value being searched
         */
        setSearch() {
            const value = getEventTargetValue() || ""
            this.search = value.trim()
            this.currentPage = 1
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
        },
        perPageSizes: {
            handler: "setDefaults",
        }
    }
})