import { mapState } from 'vuex'
import store from '../store/index'

export default {
    name: "DataTableSearchFilter",

    beforeCreate() {
        this.$store = store
    },

    computed: mapState(['searchText']),
};
