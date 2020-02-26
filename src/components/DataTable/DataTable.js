import DataTableEntriesInfo from "./EntriesInfo/EntriesInfo.vue";
import DataTableEntriesLength from "./EntriesLength/EntriesLength.vue";
import DataTablePagination from "./TablePagination/TablePagination.vue";
import DataTableSearchFilter from "./SearchFilter/SearchFilter.vue";
import DataTableWrapper from "./TableWrapper/TableWrapper.vue";
import Vue from 'vue'

window.DataTableEventBus = new Vue()

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
        //
        this.$store.commit("dataTable/mergeParameters", this.parameters)

        //
        let length = this.$store.getters["dataTable/defaultEntryLength"]
        this.$store.commit("dataTable/setCurrentEntryLength", length)
    },
};

export default DataTable;
