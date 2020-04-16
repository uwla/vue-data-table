export default {
    /**
     * Get columns that can be searched
     * @return Array
     */
    searchableColumns: state => state.columns.filter(column => column.searchable),

    /**
     * Get the data to be displayed
     * @return Array
     */
    data: (state, getters) => getters.dataFilteredByEntryLength,

    /*
    * Filter the data by the current entry length and the current page.
    * @return Object
    */
    dataFilteredByEntryLength(state, getters) {
        // -2 = -1 due to array index + -1 because first item must appear
        let end = getters.lastEntry, start = getters.firstEntry - 2

        if (start < 0)
            start = 0

        return getters.dataSorted.slice(start, end);
    },

    /**
     * Data filtered by search text
     * @return void
     */
    dataFilteredBySearch(state, getters) {
        let {search, data} = state

        if (search === "" || search === null)
            return data

        return data.filter(object => {
            return getters.searchableColumns.some(column => {
                let {key} = column, value = object[key]

                if (typeof value == "string")
                    return value.toLowerCase().includes(search.toLowerCase())
                if (typeof value == "number")
                    return value.toString().includes(search)
                return false
            })
        })
    },

    /**
     * Perform a case-insensitive sorting.
     * @return array
     */
    dataSorted(state, getters) {
        let data = getters.dataFilteredBySearch

        if (state.sortingColumns.length === 0)
            return data

        // create a copy of data and columns
        data = [...data]
        let columns = [...state.sortingColumns]

        if (data.length === 0)
            return data

        // reverse the columns, so that the first columns
        // will be the last to be sorted. This way, the first
        // columns will have more effect on the final order
        columns.reverse()

        columns.forEach(column => {
            let {key, sortingDirection: direction} = column

            if (typeof data[0][key] === "number")
                data.sort((a, b) => a[key] - b[key])
            else // sort strings
                data.sort((a, b) => a[key].toLowerCase().localeCompare(b[key].toLowerCase()))

            if (direction === "desc")
                data.reverse()
        })

        return data
    },

    /**
     * Get the number of records
     * @return Integer
     */
    totalEntries: state => state.data.length,

    /**
     * Get the number of records
     * @return Integer
     */
    filteredEntries: (state, getters) => getters.dataFilteredBySearch.length,

    /**
     * Get the index of the first record being displayed in the current page
     * @return Integer
     */
    firstEntry: state => 1 + state.currentEntryLength * (state.currentPage - 1),

    /**
     * Get the index of the last record being displayed in the current page
     * @return Integer
     */
    lastEntry(state, getters) {
        let lastEntry = getters.firstEntry + state.currentEntryLength - 1;

        if (lastEntry > getters.filteredEntries)
            lastEntry = getters.filteredEntries

        return lastEntry
    },

    /* PAGINATION */

    /**
     * Get the number of pages being displayed
     * @return Integer
     */
    numberOfPages(state, getters) {
        return Math.ceil(getters.filteredEntries / state.currentEntryLength) || 1
    },

    currentPage(state, getters) {
        if (state.currentPage > getters.numberOfPages)
            state.currentPage = getters.numberOfPages
        return state.currentPage
    },
}
