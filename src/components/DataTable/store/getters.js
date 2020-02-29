import defaults from '../defaults';

export default {
    /** COLUMNS */

    /**
     * Get columns that can be searched
     * @return Array
     */
    searchableColumns: state => state.columns.filter(col => col.searchable),

    /* DATA */

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

        if (search == "" || search == null)
            return data

        return data.filter(object => {
            // for each searchable key in the object
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

        if (state.sortingColumns.length == 0)
            return data

        // create a copy of the data
        data = [...data]

        // get the columns to perform a multiple sort
        let columns = state.sortingColumns.map(col => {
            return {key: col.key, direction: col.sortingDirection}
        })

        // reverse the columns, so that the first columns
        // will be the last to be sorted. This way, the first
        // columns will have more effect on the final order
        columns.reverse()

        columns.forEach(col => {
            let {key, direction} = col

            if (typeof data[0][key] == "number") // sort numbers
                data.sort((a, b) => a[key] - b[key])
            else // sort strings
                data.sort((a, b) => a[key].toLowerCase().localeCompare(b[key].toLowerCase()))

            if (direction == "desc")
                data.reverse()
        })

        return data
    },

    /* ENTRIES */

    /**
     * Get the default entry length
     * @return Number
     */
    defaultEntryLength(state) {
        let {defaultEntryLength, entriesLengths} = state

        if (defaultEntryLength)
            return defaultEntryLength
        if (entriesLengths)
            return entriesLengths[0]

        return defaults.defaultEntryLength
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

        if (lastEntry > getters.dataFilteredBySearch.length)
            lastEntry = getters.dataFilteredBySearch.length

        return lastEntry
    },

    /* PAGINATION */

    /**
     * Get the number of pages being displayed
     * @return Integer
     */
    numberOfPages(state, getters) {
        return Math.ceil(getters.dataFilteredBySearch.length/state.currentEntryLength) || 1
    },

    currentPage(state, getters) {
        if (state.currentPage > getters.numberOfPages)
            state.currentPage = getters.numberOfPages
        return state.currentPage
    },
}
