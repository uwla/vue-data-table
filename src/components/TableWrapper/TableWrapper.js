import {mapState} from 'vuex'
import DataTableTbody from './TableBody/TableBody.vue'
import DataTableThead from './TableHead/TableHead.vue'

export default {
    name: "DataTableWrapper",

    components: {
        DataTableTbody,
        DataTableThead
    },

    computed: {
        ...mapState('dataTable', ['tableClass', 'tableWrapperClass']),
    },
};
