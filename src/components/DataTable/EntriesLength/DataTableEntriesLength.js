import {mapState} from 'vuex'

export default {
    name: "DataTableEntriesLength",

    computed: {
        ...mapState('dataTable', ['currentEntryLength', 'entriesLengths', 'entriesLengthText']),

        textPieces() {
            return this.entriesLengthText.split(":entries")
        },

        textBeforeEntries() {
            return this.textPieces[0]
        },

        textAfterEntries() {
            return this.textPieces[1] || ""
        },
    },
};
