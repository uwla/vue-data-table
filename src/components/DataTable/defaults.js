import DataTableViewButton from './Actions/ActionButtonView.vue'
import DataTableEditButton from './Actions/ActionButtonEdit.vue'
import DataTableDeleteButton from './Actions/ActionButtonDelete.vue'

export default {
    sortingColumns: [],
    search: "",
    currentPage: 1,
    currentEntryLength: 0,

    // visible components
    components: ["EntriesLength", "EntriesInfo", "SearchFilter", "Pagination"],

    // column options
    data: [],
    columns: [],
    columnOptions: {
        orderable: true,
        searchable: true,
    },

    actions: ["view", "edit", "delete"],
    actionColumn: false, //false, true, "multiple" //
    actionColumnText: "Actions",
    actionColumnsText: {view: "View", edit: "Edit", delete: "Delete"},
    actionButtons: {view:  DataTableViewButton, edit: DataTableEditButton, delete: DataTableDeleteButton},

    // scroll options
    fixedHeader: true,

    // entry
    defaultEntryLength: 10,
    entriesLengths: [10, 25, 50, 100],
    text: "Show :entries entries",

    // Entries Info
    infoText: "Showing :first to :last of :total entries",
    infoTextFiltered: "Showing :first to :last of :filtered (filtered from :total entries)",

    // Pagination
    nextButtonText: "Next",
    previousButtonText: "Previous",

    // Search Filter
    searchText: "search:",
    emptyTableText: "No matching records found",

    // Table
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
