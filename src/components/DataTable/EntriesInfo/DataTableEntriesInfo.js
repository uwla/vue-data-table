export default {
    name: "DataTableEntriesInfo",

    computed: {
        /**
         * The text to display in the left-bottom of the table
         * @return string
        */
        text() {

            if (this.totalEntries == this.totalFilteredEntries) {
                // ex: "Showing 51 to 100 of 256 entries"
                return this.entriesInfoText
                .replace(":first", this.firstEntry)
                .replace(":last", this.lastEntry)
                .replace(":total", this.totalFilteredEntries);
            }

            // ex: "Showing 26 to 50 of 176 entries (filtered from 439 entries)"
            return this.entriesInfoTextFiltered
                        .replace(":first", this.firstEntry)
                        .replace(":last", this.lastEntry)
                        .replace(":totalFiltered", this.totalFilteredEntries)
                        .replace(":total", this.totalEntries);
        },

        /**
         * The index of the first entry being displayed
         * @return integer
         */
        firstEntry() {
            return 1;
        },

        /**
         * The index of the last entry being displayed
         * @return integer
         */
        lastEntry() {
            return 10;
        },

        /**
         * The total number of entries being displayed
         * @return integer
         */
        totalFilteredEntries() {
            return this.dataFiltered.length;
        },

        /**
         * The total number of entries, regardless of then being displayed or not
         * @return integer
         */
        totalEntries() {
            return this.data.length;
        },
    },

    props: {
        params: {
            type: Object,
            required: true,
        }
    },
};
