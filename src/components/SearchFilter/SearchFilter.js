import { mapState } from 'vuex'

export default {
    name: "DataTableSearchFilter",

    computed: mapState('dataTable', ['searchText', 'search']),
};
