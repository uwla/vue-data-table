export default {
    name: "DataTableEntriesLength",

    computed: {
        textPieces() {
            return this.entriesLengthText.split(":entries");
        },

        textBeforeEntries() {
            return this.textPieces[0] || "";
        },

        textAfterEntries() {
            return this.textPieces[1] || "";
        },
    },

    props: {
        entryLength: {
            type: Number,
            required: true,
        },
        entriesLength: {
            type: Array,
            required: true,
        },
        entriesLengthText: {
            type: String,
            required: true
        }
    },
};
