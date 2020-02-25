import {mapState} from 'vuex'
import DataTableViewButton from '../../../Actions/Buttons/DataTableActionBtnView.vue'
import DataTableEditButton from '../../../Actions/Buttons/DataTableActionBtnEdit.vue'
import DataTableDeleteButton from '../../../Actions/Buttons/DataTableActionBtnDelete.vue'


export default {
    name: "DataTableBody",

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
