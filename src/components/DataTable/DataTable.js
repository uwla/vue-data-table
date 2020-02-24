import DataTableEntriesInfo from './EntriesInfo/DataTableEntriesInfo.vue';
import DataTableEntriesLength from './EntriesLength/DataTableEntriesLength.vue';
import DataTablePagination from './Pagination/DataTablePagination.vue';
import DataTableSearchFilter from './SearchFilter/DataTableSearchFilter.vue';
import DataTableWrapper from './Wrapper/DataTableWrapper.vue';
import store from './store/index'

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

    beforeCreate() {
        this.$store = store;
    },

    created() {
        this.$store.commit('setOptions', this.parameters)

        let length = this.$store.getters.defaultEntryLength
        this.$store.commit('setCurrentEntryLength', length)
    },
};

export default DataTable;
