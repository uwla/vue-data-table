// Main components
import DataTableEntriesInfo from "./EntriesInfo/EntriesInfo.vue"
import DataTableEntriesLength from "./EntriesLength/EntriesLength.vue"
import DataTableExportButton from "./ExportButton/ExportButton.vue"
import DataTablePagination from "./TablePagination/TablePagination.vue"
import DataTableSearchFilter from "./SearchFilter/SearchFilter.vue"
import DataTableWrapper from "./TableWrapper/TableWrapper.vue"

// Action buttons
import DataTableViewButton from "./ActionButtons/ActionButtonView.vue"
import DataTableEditButton from "./ActionButtons/ActionButtonEdit.vue"
import DataTableDeleteButton from "./ActionButtons/ActionButtonDelete.vue"

// Sorting components
import DataTableSortIcon from "./SortableColumn/SortIcon.vue"
import DataTableSortIndex from "./SortableColumn/SortIndex.vue"

export default {
    name: "DataTable",

    components: {
        DataTableEntriesInfo,
        DataTableSearchFilter,
        DataTablePagination,
        DataTableEntriesLength,
        DataTableWrapper,
        DataTableExportButton
    },

    created() {
        this.parseData(this.$props)
    },

    methods: {
        parseData(data) {
            this.$store.commit("dataTable/parseData", data)
        }
    },

    props: {
        actions: {
            type: Array,
            default: () => ["view", "edit", "delete"]
        },
        actionButtons: {
            type: Object,
            default: () => ({
                view: DataTableViewButton,
                edit: DataTableEditButton,
                delete: DataTableDeleteButton
            })
        },
        actionColumn: {
            type: [Boolean, String],
            default: false
        },
        allowedExports: {
            type: Array,
            default: () => ['xls', 'csv', 'json', 'txt'],
            validator: exports => exports.every(type => ['xls', 'csv', 'json', 'txt'].includes(type))
        },
        columns: {
            type: Array,
            required: false
        },
        columnKeys: {
            type: Array,
            required: false
        },
        data: {
            type: Array,
            required: true
        },
        defaultEntryLength: {
            type: Number,
            default: 10
        },
        downloadFilename: {
            type: String,
            default: "download"
        },
        entriesLengths: {
            type: Array,
            default: () => [10, 25, 50, 100]
        },
        lang: {
            type: String,
            default: "en",
        },
        showEntriesInfo: {
            type: Boolean,
            default: true
        },
        showEntriesLength: {
            type: Boolean,
            default: true
        },
        showExportButton: {
            type: Boolean,
            default: true
        },
        showPagination: {
            type: Boolean,
            default: true
        },
        showSearchFilter: {
            type: Boolean,
            default: true
        },
        sortingMode: {
            type: String,
            default: 'multiple',
            validator: value => ['multiple', 'single'].includes(value)
        },
        sortIndexComponent: {
            type: Object,
            default: () => DataTableSortIndex
        },
        sortIconComponent: {
            type: Object,
            default: () => DataTableSortIcon
        },
        tableClass: {
            type: String,
            default: "table table-striped table-hover"
        },
        tableWrapperClass: {
            type: String,
            default: "data-table-wrapper"
        },
        text: {
            type: Object,
            required: false
        }
    },

    watch: {
        $props: {
            handler(value) {
                this.parseData(value)
                return value
            },
            deep: true,
            immediate: true
        },
    },
};
