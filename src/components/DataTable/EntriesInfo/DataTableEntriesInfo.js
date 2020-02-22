export default {
    name: "DataTableEntriesInfo",

    computed: {
        /**
         * The text to display in the left-bottom of the table
         * @return string
        */
        infoText() {
            // case 1, no filter
            // ex: "Showing 51 to 100 of 256 entries"
            if (this.totalEntries == this.filteredEntries) {
                return this.text
                            .replace(":first", this.firstEntry)
                            .replace(":last", this.lastEntry)
                            .replace(":total", this.filteredEntries);
            }

            // case 2, filt
            // ex: "Showing 26 to 50 of 176 entries (filtered from 439 entries)"
            return this.textFiltered
                        .replace(":first", this.firstEntry)
                        .replace(":last", this.lastEntry)
                        .replace(":filtered", this.filteredEntries)
                        .replace(":total", this.totalEntries);
        },
    },

    props: {
        firstEntry: {
            type: Number,
            required: true
        },
        lastEntry: {
            type: Number,
            required: true
        },
        filteredEntries: {
            type: Number,
            required: true
        },
        totalEntries: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true,
        },
        textFiltered: {
            type: String,
            required: true,
        },
    },
};
