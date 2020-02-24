import {mapState} from 'vuex'
import store from '../store/index'

export default {
    name: "DataTableEntriesLength",

    beforeCreate() {
        this.$store = store
    },

    computed: {
        ...mapState(['currentEntryLength', 'entriesLengths', 'entriesLengthText']),

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
