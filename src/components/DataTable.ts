import VdtEntriesInfo from "./EntriesInfo/EntriesInfo.vue"
import VdtExportData from "./ExportData/ExportData.vue"
import VdtPagination from "./Pagination/Pagination.vue"
import VdtPerPage from "./PerPage/PerPage.vue"
import VdtSearchFilter from "./SearchFilter/SearchFilter.vue"
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
import { SORTING_MODE } from "../const"
import type { Column, Data } from "../types"

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
        allowedExports: { type: Array, default: () => ["csv", "json", "xml"] },
        columns: { type: Array, required: false },
        columnKeys: { type: Array, required: false },
        data: { type: Array, required: false },
        defaultColumn: { type: Object, required: false, default: () => ({}) },
        defaultPerPage: { type: Number, default: 10 },
        downloadFileName: { type: String, default: "download" },
        fetchUrl: { type: String, required: false },
        fetchCallback: { type: Function, required: false },
        footerComponent: { type: [Object, String], default: null },
        isLoading: { type: Boolean, default: false },
        lang: { type: String, default: "en" },
        loadingComponent: { type: [Object, String], default: () => "" },
        perPageSizes: { type: Array, default: () => [10, 25, 50, 100, "*"] },
        showEntriesInfo: { type: Boolean, default: true },
        showPerPage: { type: Boolean, default: true },
        showDownloadButton: { type: Boolean, default: true },
        showPagination: { type: Boolean, default: true },
        showSearchFilter: { type: Boolean, default: true },
        sortingMode: {
            type: String,
            default: "multiple",
            validator: (value: string) => {
                return ["multiple", "single", "none"].includes(value)
            },
        },
        sortingIndexComponent: {
            type: [Object, String],
            default: "vdt-sorting-index",
        },
        sortingIconComponent: {
            type: [Object, String],
            default: "vdt-sorting-icon",
        },
        tableClass: {
            type: String,
            default: "table table-striped table-hover",
        },
        text: { type: Object, required: false },
        vKey: { type: String, default: "" },
    },

    emits: ["userEvent"],

    data: () => {
        return reactive({
            dataFetched: [] as Column[],
            dataFetchedLinks: [] as any[],
            currentPage: 1,
            currentPerPage: 10,
            parsedColumns: [] as Column[],
            columnsBeingSorted: [] as Column[],
            perPageText: "",
            perPageAllText: "",
            downloadText: "",
            downloadButtonText: "",
            emptyTableText: "",
            infoText: "",
            infoAllText: "",
            infoFilteredText: "",
            nextButtonText: "",
            previousButtonText: "",
            paginationSearchText: "",
            paginationSearchButtonText: "",
            search: "",
            searchText: "",
            totalRecords: 0,
        })
    },

    computed: {
        actualData() {
            return this.data != null ? this.data : this.dataFetched
        },

        /**
         * Get the total number of columns
         */
        numberOfColumns() {
            return this.parsedColumns.length
        },

        /**
         * Get the columns that can be used in searches
         */
        searchableColumns() {
            return this.parsedColumns.filter(
                (column: Column) => column.searchable
            )
        },

        /**
         * Get the columns that can be sorted
         */
        sortableColumns() {
            return this.parsedColumns.filter(
                (column: Column) => column.sortable
            )
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
            const { searchableColumns, search } = this

            // assign key to track row
            const key = this.vKey
            const data = this.actualData.map((value: any, index) => {
                if (key !== "" && value[key]) {
                    index = value[key]
                }
                return { ...(value as object), _key: index }
            })

            if (isNullable(search)) {
                return data
            }

            return data.filter(function (row: any) {
                return searchableColumns.some(function (column: Column) {
                    return column.searchFunction(row, search, column.key)
                })
            })
        },

        /**
         * The data after sorting it by the desirable columns
         */
        dataSorted() {
            const { dataFiltered: data, columnsBeingSorted } = this

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
            if (!this.data) return this.dataFetched.length === 0
            else return this.dataDisplayed.length === 0
        },

        //
        // ─── PER PAGE ────────────────────────────────────────────────────────
        //

        /**
         * Get the index of the first record being displayed in the current page
         */
        firstEntry() {
            const { dataFiltered, currentPerPage, currentPage } = this
            if (
                dataFiltered.length === 0 ||
                (currentPerPage as number | string) === "*"
            ) {
                return 0
            }
            return currentPerPage * (currentPage - 1) + 1
        },

        /**
         * Get the index of the last record being displayed in the current page
         */
        lastEntry() {
            const { currentPerPage } = this
            if ((currentPerPage as number | string) === "*") {
                return this.filteredEntries
            }
            return Math.min(
                this.filteredEntries,
                this.firstEntry + currentPerPage - 1
            )
        },

        /**
         * Get the number of records
         */
        totalEntries() {
            if (this.data == null) return this.totalRecords
            else return this.actualData.length
        },

        /**
         * Get the number of records filtered
         */
        filteredEntries() {
            if (this.data == null) return this.totalRecords
            return this.dataFiltered.length
        },

        /**
         * The text containing how many rows are being shown
         */
        entriesInfoText() {
            const {
                currentPerPage,
                infoText,
                infoAllText,
                infoFilteredText,
                firstEntry,
                lastEntry,
                filteredEntries,
                totalEntries,
            } = this
            const replacements = [
                firstEntry,
                lastEntry,
                filteredEntries,
                totalEntries,
            ]
            if ((currentPerPage as number | string) === "*") {
                return infoAllText
            }
            const searchValues = [":first", ":last", ":filtered", ":total"]
            let text = infoText
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
            const { currentPerPage } = this
            if ((currentPerPage as number | string) === "*") return 1
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
                    lastPage,
                ]
            }
            if (lastPage > 7 && lastPage <= currentPage + 3) {
                return [
                    1,
                    "...",
                    lastPage - 3,
                    lastPage - 2,
                    lastPage - 1,
                    lastPage,
                ]
            }
            throw new Error('INVALID PAGE RANGE')
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
                perPageAllText: this.perPageAllText,
            }
        },

        /**
         * The props for the SearchFilter component
         */
        propsSearchFilter() {
            return { search: this.search, searchText: this.searchText }
        },

        /**
         * The props for the Table component
         */
        propsTable() {
            const dataNotNull = this.data != null
            const data = dataNotNull ? this.data : this.dataFetched
            const dataDisplayed = dataNotNull
                ? this.dataDisplayed
                : this.dataFetched
            const dataFiltered = dataNotNull
                ? this.dataFiltered
                : this.dataFetched
            return {
                columns: this.parsedColumns,
                data: data,
                dataDisplayed: dataDisplayed,
                dataFiltered: dataFiltered,
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
            return { entriesInfoText: this.entriesInfoText }
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
        },
    },

    watch: {
        columns: { handler: "parseColumnProps", deep: true, immediate: true },
        columnKeys: {
            handler: "parseColumnProps",
            deep: true,
            immediate: true,
        },
        columnsBeingSorted: {
            handler: "updateData",
            deep: false,
            immediate: false,
        },
        text: { handler: "parseTextProps", deep: true, immediate: true },
        lang: { handler: "parseTextProps" },
        perPageSizes: { handler: "setDefaults" },
    },

    mounted() {
        this.setDefaults()
        this.updateData()
    },

    methods: {
        /**
         * Update data, fetching it if needed.
         * If all data was previously fetched, it is stored in state variables,
         * therefore nothing is done in that case.
         */
        async updateData() {
            if (this.data === null || this.data === undefined) this.fetchData()
        },

        async fetchData(url = "") {
            if (this.fetchUrl == null || this.fetchCallback == null)
                throw Error("Fetch parameters are null")

            // empty URL but we have the URL stored
            if (url === "" && this.dataFetchedLinks.length > 1) {
                url =
                    this.dataFetchedLinks[this.currentPage].url +
                    this.getSearchQuery() +
                    this.getSortQuery()
            }

            // initial URL
            if (url === "") {
                url = this.fetchUrl
            }

            this.fetchCallback(url).then((responseData: any) => {
                // Laravel API.
                // If response is from ResourceCollection,
                // then the metadata is in a nested object called meta.
                // Otherwise, the metadata is directly in the JSON response.
                const { data } = responseData
                const meta = responseData.meta ?? responseData
                this.dataFetched = data
                this.dataFetchedLinks = meta.links
                this.currentPage = meta.current_page
                this.currentPerPage = meta.per_page
                this.totalRecords = meta.total
            })
        },

        /**
         * Propagate upwards an event from user's custom component
         */
        emitUserEvent(payload: any) {
            this.$emit("userEvent", payload)
        },

        /**
         * Indicates if a page is valid
         */
        isValidPage(page: any): boolean {
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
                for (const col of this.sortableColumns as Column[]) {
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
            if (column.sortingMode === SORTING_MODE.ASC) {
                column.sortingMode = SORTING_MODE.DESC
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
            this.columnsBeingSorted = this.columnsBeingSorted.filter(
                (c: Column) => {
                    return c.id !== column.id
                }
            )

            // in this case,
            // it is necessary to update the sorting index of other columns
            // to reflect the fact that there is one less column.
            this.columnsBeingSorted.forEach(function (col: Column, i: number) {
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
            if (!this.isValidPage(value)) {
                return
            }
            this.currentPage = value
            this.updateData()
        },

        /**
         * Set the current rows per page
         */
        setPerPage(value: any) {
            let newPerPage, newCurrentPage
            const previousFirstEntry = this.firstEntry

            // before updating the value of currentPerPage,
            // we need to store the current firstEntry.
            // We will use it to change the current page.
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
            if ((this.currentPerPage as number | string) === "*") {
                newCurrentPage = 1
            } else {
                newCurrentPage = Math.floor(previousFirstEntry / newPerPage) + 1
            }
            this.setPage(newCurrentPage)
        },

        /**
         * Set the current rows per page from the user input
         */
        setPerPageFromUserInput() {
            let value = getEventTargetValue()
            if (value !== "*") value = Number(value)
            this.setPerPage(value)
        },

        /**
         * Set the value being searched
         */
        setSearch() {
            const value = getEventTargetValue() || ""
            this.search = value.trim()
            this.currentPage = 1
            this.updateData()
        },

        /**
         * Get search query URI for fetching data.
         *
         * @returns string
         */
        getSearchQuery() {
            const encodedSearch = encodeURIComponent(this.search)
            let searchQueryUri = ""
            this.searchableColumns.forEach((col: Column) => {
                if (col.key) {
                    searchQueryUri += `&filter[${col.key}]=${encodedSearch}`
                }
            })
            return searchQueryUri
        },

        /**
         * Return the sort query URI for fetching data.
         *
         * @returns string
         */
        getSortQuery() {
            const { columnsBeingSorted } = this

            // nothing being sorted
            if (columnsBeingSorted.length == 0) return ""

            let searchQueryUri = "&sort="
            const descPrefix = "-"
            const sep = ","
            columnsBeingSorted.forEach((col: Column) => {
                if (col.sortingMode == SORTING_MODE.DESC)
                    searchQueryUri += descPrefix
                searchQueryUri += col.key + sep
            })
            return searchQueryUri
        },
    },
})
