import {mapState} from 'vuex'
import DataTableTbody from './Tbody/DataTableTbody.vue'
import DataTableThead from './Thead/DataTableThead.vue'

export default {
    name: "DataTableWrapper",

    components: {
        DataTableTbody, DataTableThead
    },

    computed: {
        ...mapState('dataTable', ['table', 'tableWrapper']),
    },
};
