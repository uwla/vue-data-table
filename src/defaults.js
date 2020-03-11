import DataTableViewButton from './components/ActionButtons/ActionButtonView.vue'
import DataTableEditButton from './components/ActionButtons/ActionButtonEdit.vue'
import DataTableDeleteButton from './components/ActionButtons/ActionButtonDelete.vue'
import DataTableSortIcon from './components/SortableColumn/SortIcon.vue'
import DataTableSortIndex from './components/SortableColumn/SortIndex.vue'

export default {
    lang: "en",

    //
    sortIndexComponent: DataTableSortIndex,
    sortIconComponent: DataTableSortIcon,

    // initial values
    sortingColumns: [],
    search: "",
    currentPage: 1,
    currentEntryLength: 0,

    // visible components
    showEntriesLength: true,
    showEntriesInfo: true,
    showSearchFilter: true,
    showPagination: true,

    // column options
    data: [],
    columns: [],
    columnOptions: {
        orderable: true,
        searchable: true,
    },

    actions: ["view", "edit", "delete"],
    actionColumn: false, //false, true, "multiple" //
    actionButtons: {view:  DataTableViewButton, edit: DataTableEditButton, delete: DataTableDeleteButton},

    // scroll options
    // fixedHeader: true,

    // entry
    defaultEntryLength: 10,
    entriesLengths: [10, 25, 50, 100],

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
