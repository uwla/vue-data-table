import VdtTableCell from "./components/Table/TableCell.vue"
import VdtTableCellEditable from "./components/Table/TableCellEditable.vue"
import { searchNumericColumn, searchStringColumn, toTitleCase } from "./helpers"
import translations from "./lang"

// default column to all instances of VDT
export const globalDefaultColumn = {
    component: VdtTableCell,
    componentProps: {},
    index: 1000,
    searchable: true,
    sortable: true,
    editable: false,
    type: "string",
}

const type2searchFunction = {
    string: searchStringColumn,
    numeric: searchNumericColumn,
    number: searchNumericColumn,
}

export function parseColumnProps(props) {
    // extract the columns. If not set, columns are derived from columnKeys
    let columns = props.columns || props.columnKeys.map(key => ({ key }))

    // extract the local default column
    let defaultColumn = props.defaultColumn || {}

    // merge default column with the columns
    columns = columns.map(function(column, i) {
        column = { ... column }
        let { key } = column

        // if component not set, need to pass the key to the default component
        if (column.component == null)
            column.componentProps = { columnKey: key }

        // by default, columns with custom components are not sortable or searchable
        if (column.component != null) {
            column.searchable = column.searchable || false
            column.sortable = column.sortable || false
        }

        // editable cell
        if (column.editable)
            column.component = VdtTableCellEditable

        // merge the column with the default values
        column = { ...globalDefaultColumn, ...defaultColumn, ...column }

        // some default values are dynamically computed
        let { type } = column
        column.title = column.title || toTitleCase(key)
        column.searchFunction = column.searchFunction || type2searchFunction[type]

        // options below are used internally
        // shall not be overwritten by the user
        column.sortingIndex = -1
        column.sortingMode = null
        column.id = i

        return column
    })

    /* order the columns by the index, so the user can
    set a custom order for the columns to be displayed */
    columns.sort(function(a, b) {
        return a.index - b.index
    })

    // finally, return the parsed columns
    return columns
}

export function parseTextProps(props) {
    const { lang, text } = props
    return { ...translations[lang], ...text }
}
