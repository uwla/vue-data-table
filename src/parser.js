import VdtTableCell from "./components/Table/TableCell.vue"
import { toTitleCase } from "./helpers"
import translations from "./lang"

// default common to all instances of VDT
export const globalDefaultColumn = {
    component: VdtTableCell,
    componentProps: {},
    index: 0,
    searchable: true,
    sortable: true,
    type: "string",
}

export function parseColumnProps(props) {
    // extract the columns
    // if not set, columns are derived from columnKeys
    let columns = props.columns || props.columnKeys.map(key => ({ key }))

    // extract the local default column
    let defaultColumn = props.defaultColumn || {}

    // merge default column with the columns
    columns = columns.map(function(column, i) {
        // get explicit title or guess title from `key`
        let title = column.title || toTitleCase(column.key)

        // if a custom component is not set,
        // we need to pass some props to the default component
        if (column.component == null)
            column.componentProps = { columnKey: column.key }

        // also, by default,
        // columns with custom components shall not be sortable or searchable
        if (column.component != null) {
            column.searchable = column.searchable || false
            column.sortable = column.sortable || false
        }

        return {
            ...globalDefaultColumn,
            ...defaultColumn,
            ...column,

            // options below are used internally,
            // and shall not be overwritten by the user
            sortingIndex: -1,
            sortingMode: null,
            title: title,
            id: i,
        }
    })

    /* order the columns by the index, so the user can
    set a custom order for the columns to be displayed */
    columns.sort(function(a, b) {
        if (a.index !== b.index) {
            return a.index - b.index
        }
        return a.id - b.id
    })

    // finally, return the parsed columns
    return columns
}

export function parseTextProps(props) {
    const { lang, text } = props
    return { ...translations[lang], ...text }
}
