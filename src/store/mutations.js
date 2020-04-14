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

        columns = columns.map((col, index) => {
            if (!col.title)
                col.title = toTitleCase(col.key)
            return {...state.columnOptions, ...col, index, sortIndex: -1, sortingDirection: ""}
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

        // set the sorting direction if none is set
        if (column.sortingDirection === "") {
            column.sortingDirection = "asc"

            // add it to our array of columns being sorted
            column.sortIndex = state.sortingColumns.length
            state.sortingColumns.push(column)
            return
        }

        if (column.sortingDirection === "asc") {
            column.sortingDirection = "desc"
            state.sortingColumns.splice(column.sortIndex, 1, column)
            return
        }

        // remove it from sorting
        column.sortingDirection = ""
        column.sortIndex = -1

        // reset the sortIndex of all columns, which indicate the
        // priority of each column in the sorting. This number
        // is displayed on the right side of the column's title
        state.sortingColumns =
            state.sortingColumns.filter(col => col.index !== column.index).map((col, i) => {
                col.sortIndex = i
                return col
            })
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
