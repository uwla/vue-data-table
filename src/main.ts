import VueDataTable from './components/DataTable.vue'
import VdtTableCell from './components/Table/TableCell.vue'
import VdtTableCellEditable from './components/Table/TableCellEditable.vue'
import VdtActionButtons from './components/ActionButtons/ActionButtons.vue'

const components : { [key: string] : any } = {
    'vdt': VueDataTable,
    'vdt-cell': VdtTableCell,
    'vdt-cell-editable': VdtTableCellEditable,
    'vdt-actions': VdtActionButtons,
    'vdt-action-buttons': VdtActionButtons,
    'vue-data-table': VueDataTable,
}

function install(app: any) {
    for (let componentName in components)
        app.component(componentName, components[componentName])
}

const plugin = { install }

export {
    plugin as default,
}
