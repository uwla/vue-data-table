import translations from '../lang'

export default {
    /**
     * Set the current page of the pagination
     * @param Object state
     * @param Number page
     */
    setCurrentPage: (state, page) => state.currentPage = page,

    /**
     * Merge the options with the defaults
     * @param Object state
     * @param Object options
     */
    parseData (state, options) {
        let columns = options.columns || options.columnKeys.map(key => ({key}))

        columns = columns.map((column, index) => {
            if (!column.title)
                column.title = toTitleCase(column.key)
            return {
                ...state.columnOptions,
                ...column,
                index,
                sortingIndex: -1,
                sortingDirection: ""
            }
        })

        let {defaultEntryLength, entriesLengths} = options
        state.currentEntryLength = entriesLengths.includes(defaultEntryLength) ?
            defaultEntryLength : entriesLengths[0]

        Object.assign(state, translations[options.lang], options, options.text, {columns})
    },

    /**
     * Set the number of records to be displayed per pages
     * @param Object state
     * @param Number entryLength
     */
    setCurrentEntryLength: (state, entryLength) => state.currentEntryLength = entryLength,

    /**
     * Toggle entry length, but still shows the records from the last entry length
     * @param Object state
     * @return void
     */
    toggleEntryLength (state) {
        let newEntryLength = Number(window.event.target.value);
        let firstDataIndex = 1 + state.currentEntryLength * (state.currentPage - 1);

        state.currentEntryLength = newEntryLength;

        // reset the current page to continue displaying the data that was shown before
        state.currentPage = Math.ceil(firstDataIndex / newEntryLength);
    },

    /**
     * Toggle the text used to filter data
     * @param Object state
     * @return void
     */
    toggleSearch (state) {
        state.search = window.event.target.value.trim();

        // reset the page to avoid bugs
        state.currentPage = 1;
    },

    /**
     * Toggle the direction of the column being sorted
     * @param Object state
     * @param Object column
     * @return void
     */
    toggleSorting (state, column) {
        if (!column.orderable)
            return
        if (state.sortingMode === "single") {

            state.columns.forEach(col => {
                if (col.index !== column.index)
                    col.sortingDirection = ""
            })

            if (column.sortingDirection === "desc") {
                column.sortingDirection = ""
                state.sortingColumns = []
                return
            }

            if (column.sortingDirection === "")
                column.sortingDirection = "asc"
            else
                column.sortingDirection = "desc"
            state.sortingColumns = [column]
            return
        }

        if (column.sortingDirection === "") {
            column.sortingDirection = "asc"
            column.sortingIndex = state.sortingColumns.length
            state.sortingColumns.push(column)
            return
        }

        if (column.sortingDirection === "asc") {
            column.sortingDirection = "desc"
            state.sortingColumns.splice(column.sortingIndex, 1, column)
            return
        }

        column.sortingDirection = ""
        column.sortingIndex = -1

        // reset the sortingIndex of all columns, which indicate the
        // priority of each column in the sorting. This number
        // is displayed on the right side of the column's title
        state.sortingColumns = state.sortingColumns.filter(col => col.index !== column.index)
        state.sortingColumns.forEach((col, index) => col.sortingIndex = index)
    },
}

/**
 * Convert a string to title Case (first letter capitalized and words separated by space)
 *
 * @param string
 * @return string
 */
function toTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/[-_]/ig, ' ')
}
