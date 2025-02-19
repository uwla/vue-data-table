import VueDataTable from "./components/DataTable.vue"
import VdtTableCell from "./components/Table/TableCell.vue"
import VdtTableCellEditable from "./components/Table/TableCellEditable.vue"
import VdtTableCellSelectable from "./components/Table/TableCellSelectable.vue"
import VdtActionButtons from "./components/ActionButtons/ActionButtons.vue"
import VdtSortingIcon from "./components/SortableColumn/SortingIcon.vue"
import VdtSortingIndex from "./components/SortableColumn/SortingIndex.vue"

const components: { [key: string]: any } = {
    "vdt": VueDataTable,
    "vdt-cell": VdtTableCell,
    "vdt-cell-editable": VdtTableCellEditable,
    "vdt-cell-selectable": VdtTableCellSelectable,
    "vdt-actions": VdtActionButtons,
    "vdt-action-buttons": VdtActionButtons,
    "vue-data-table": VueDataTable,
    "vdt-sorting-icon": VdtSortingIcon,
    "vdt-sorting-index": VdtSortingIndex,
}

function install(app: any) {
    for (const componentName in components)
        app.component(componentName, components[componentName])
}

const plugin = { install }

export { components, plugin, plugin as default }
