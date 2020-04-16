import {mapGetters, mapState} from 'vuex'

export default {
    name: "DataTableEntriesInfo",

    computed: {
        ...mapGetters('dataTable', ['totalEntries', 'filteredEntries', 'firstEntry', 'lastEntry']),
        ...mapState('dataTable', ['infoText', 'infoTextFiltered']),

        /**
         * The text to display in the left-bottom of the table
         * @return string
        */
        text() {
            if (this.totalEntries == this.filteredEntries) {
                return this.infoText
                                .replace(":first", this.firstEntry)
                                .replace(":last", this.lastEntry)
                                .replace(":total", this.filteredEntries)
            }

            return this.infoTextFiltered
                            .replace(":first", this.firstEntry)
                            .replace(":last", this.lastEntry)
                            .replace(":filtered", this.filteredEntries)
                            .replace(":total", this.totalEntries)
        },
    },

};
