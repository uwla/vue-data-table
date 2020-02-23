

export default {
    /**
     * Set the current page of the pagination
     * @param Object state
     * @param Number page
     */
    setCurrentPage: (state, page) => state.currentPage = page,

    /**
     * Set the state's options
     * @param Object state
     * @param Object options
     */
    setOptions(state, options) {
        // map the columns
        let columns = options.columns.map((col, index) => {
            let attributes = {}

            if (col.orderable == null || col.orderable)
                attributes.class = "sortable"

            return {...state.columnOptions, ...col, index, attributes}
        })

        Object.assign(state, options)
        state.columns = columns
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
     */
    toggleEntryLength(state) {
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
    toggleSearch(state) {
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
    toggleSorting(state, column) {
        if (!column.orderable)
            return

        // set the sorting direction if none is set
        if (column.attributes["data-sorting"] == null) {
            column.attributes["data-sorting"] = "asc"

            // add it to our array of columns being sorted
            column.sortIndex = state.sortingColumns.length
            state.sortingColumns.push(column)
            return
        }

        if (column.attributes["data-sorting"] == "asc") {
            column.attributes["data-sorting"] = "desc"
            state.sortingColumns.splice(column.sortIndex, 1, column)
            return
        }

        // remove it from sorting
        column.attributes["data-sorting"] = null
        column.sortIndex = null

        // reset the sortIndex of all columns, which indicate the
        // priority of each column in the sorting. This number
        // is displayed on the right side of the column's title
        state.sortingColumns =
            state.sortingColumns.filter(col => col.index != column.index).map((col, i) => {
                col.sortIndex = i
                return col
            })
    },
}
