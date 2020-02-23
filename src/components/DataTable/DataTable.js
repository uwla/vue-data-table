import DataTableEntriesInfo from './EntriesInfo/DataTableEntriesInfo.vue';
import DataTableEntriesLength from './EntriesLength/DataTableEntriesLength.vue';
import DataTablePagination from './Pagination/DataTablePagination.vue';
import DataTableSearchFilter from './SearchFilter/DataTableSearchFilter.vue';
import DataTableWrapper from './Wrapper/DataTableWrapper.vue';

export const DataTable = {
    name: "DataTable",

    components: {
        DataTableEntriesInfo, DataTableSearchFilter, DataTablePagination, DataTableEntriesLength, DataTableWrapper
     },

    props: {
        parameters: {
            type: Object,
            required: true
        }
    },

    created() {
        this.$store.commit('dataTable/setOptions', this.parameters)

        let length = this.$store.getters["dataTable/defaultEntryLength"]
        this.$store.commit('dataTable/setCurrentEntryLength', length)
    },
};

export default DataTable;
