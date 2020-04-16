import { mapState } from 'vuex'

export default {
    name: "DataTableTr",

    computed: {
        ...mapState('dataTable', ['columns', 'actions', 'actionColumn', 'actionButtons']),

        actionItems() {
            if (this.actionColumn !== 'multiple')
                return []
            return this.actionComponents
        },

        actionComponents() {
            return this.actions.map(action => ({
                action,
                component: this.actionButtons[action]
            }))
        }
    },

    props: {
        data: {
            type: Object,
            required: true
        }
    }
};
