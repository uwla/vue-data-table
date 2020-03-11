import DataTableEntriesInfo from "./EntriesInfo/EntriesInfo.vue"
import DataTableEntriesLength from "./EntriesLength/EntriesLength.vue"
import DataTablePagination from "./TablePagination/TablePagination.vue"
import DataTableSearchFilter from "./SearchFilter/SearchFilter.vue"
import DataTableWrapper from "./TableWrapper/TableWrapper.vue"
import {mapState} from 'vuex'

export default {
    name: "DataTable",

    components: {
        DataTableEntriesInfo, DataTableSearchFilter, DataTablePagination, DataTableEntriesLength, DataTableWrapper
    },

    computed: {
        ...mapState("dataTable", ["showEntriesInfo", "showPagination", "showEntriesLength", "showSearchFilter"])
    },

    created() {
        this.mergeParameters()
    },

    methods: {
        mergeParameters() {
            this.$store.commit("dataTable/mergeParameters", this.parameters)
            let length = this.$store.getters["dataTable/defaultEntryLength"]
            this.$store.commit("dataTable/setCurrentEntryLength", length)
        }
    },

    props: {
        parameters: {
            type: Object,
            required: true
        }
    },

    watch: {
        parameters: {
            handler(value) {
                this.parameters = value
                this.mergeParameters()
            },

            deep: true
        }
    },
};
