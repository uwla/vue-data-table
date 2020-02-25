import {mapState} from 'vuex'
import DataTableViewButton from '../../../Actions/ActionButtonView.vue'
import DataTableEditButton from '../../../Actions/ActionButtonEdit.vue'
import DataTableDeleteButton from '../../../Actions/ActionButtonDelete.vue'


export default {
    name: "DataTableTr",

    components: {
        DataTableEditButton, DataTableViewButton, DataTableDeleteButton
    },

    computed: {
        ...mapState('dataTable', ['columns', 'actions', 'actionColumn', 'actionButtons']),

        actionItems() {
            if (this.actionColumn != 'multiple')
                return []
            return this.actionComponents
        },

        actionComponents() {
            return this.actions.map(action => this.actionButtons[action])
        }
    },

    props: {
        data: {
            type: Object,
            required: true
        }
    }
};
