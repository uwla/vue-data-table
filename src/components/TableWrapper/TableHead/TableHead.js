import {mapState} from 'vuex'
import DataTableTh from './TableHeader/TableHeader.vue'

export default {
    name: "DataTableTableThead",

    components: {
        DataTableTh
    },

    computed: {
        ...mapState('dataTable', ['columns', 'actions', 'actionColumn', 'actionColumnText', 'actionColumnsText']),

        actionItems() {
            if (!this.actionColumn)
                return []
            if (this.actionColumn == 'multiple')
                return this.actions.map(action => this.actionColumnsText[action])
            return [this.actionColumnText]
        }
    },
};
