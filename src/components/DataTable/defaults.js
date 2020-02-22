//import DataTableActionColumn from './ActionColumn/DataTableActionColumn.vue';

export default {

    // visible components
    components: ['EntriesLength', 'EntriesInfo', 'SearchFilter', 'Pagination'],

    // column options
    column: {
        orderable: true,
        searchable: true,
    },

    // scroll options
    fixedHeader: true,

    // entry
    entries: {
        defaultLength: 10,
        lengths: [10, 25, 50, 100],
        text: "Show :entries entries",
    },

    info: {
        text: "Showing :first to :last of :total entries",
        textFiltered: "Showing :first to :last of :filtered (filtered from :total entries)",
    },

    pagination: {
        nextButtonText: "Next",
        previousButtonText: "Previous",
    },

    filter: {
        text: "search:"
    },

    emptyTableText: "No matching records found",

    table: {
        class: "table table-striped table-hover",
    },

    tableWrapper: {
        style: {
            overflow: "auto",
            height: "75vh",
            width: "100%",
        },
    }
};
