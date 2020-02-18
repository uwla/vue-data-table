export default {
    name: "DataTableEntriesLength",

    computed: {
        textPieces() {
            return this.text.split(":entries");
        },

        textBeforeEntries() {
            return this.textPieces[0];
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
        lengths: {
            type: Array,
            required: true,
        },
        text: {
            type: String,
            required: true
        }
    },
};
