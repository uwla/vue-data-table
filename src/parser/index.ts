import { searchNumericColumn, searchStringColumn, toTitleCase } from "../utils"
import { SORTING_MODE } from "../const"
import translations from "../lang"
import type { Column, ColumnType, LanguageDict, LanguageName } from "../types"

// default column to all instances of VDT
export const globalDefaultColumn = {
    component: "vdt-cell",
    componentProps: {},
    displayIndex: 1000,
    searchable: true,
    sortable: true,
    editable: false,
    collapsible: false,
    collapsed: false,
    type: "string",
} as Column

const type2searchFunction: Partial<
    Record<ColumnType, Column["searchFunction"]>
> = { string: searchStringColumn, numeric: searchNumericColumn }

export function parseColumnProps(props: any) {
    // extract the columns. If not set, columns are derived from columnKeys
    let columns: Column[]
    if (props.columns) columns = props.columns
    else if (props.columnKeys)
        columns = props.columnKeys.map((key: string) => ({ key })) as Column[]
    else throw new Error("Neither columns or columnKeys is defined in props.")

    // extract the local default column
    const defaultColumn = props.defaultColumn || {}

    // merge default column with the columns
    columns = columns.map(function (column: Column, i: number) {
        column = { ...column }
        const { key } = column

        // if component not set, need to pass the key to the default component
        if (column.component == null) column.componentProps = { columnKey: key }

        // by default, columns with custom components are not sortable or searchable
        if (column.component != null) {
            column.searchable = column.searchable || false
            column.sortable = column.sortable || false
        }

        // editable cell
        if (column.editable) column.component = "vdt-cell-editable"

        // merge the column with the default values
        column = { ...globalDefaultColumn, ...defaultColumn, ...column }

        // some default values are dynamically computed
        const type = column.type as ColumnType
        column.title = column.title || toTitleCase(key)
        column.searchFunction =
            column.searchFunction || type2searchFunction[type]

        // options below are used internally
        // shall not be overwritten by the user
        column.sortingIndex = -1
        column.sortingMode = SORTING_MODE.NONE
        column.id = i

        return column
    })

    /* order the columns by the index, so the user can
    set a custom order for the columns to be displayed */
    columns.sort(function (a: Column, b: Column) {
        return a.displayIndex - b.displayIndex
    })

    // finally, return the parsed columns
    return columns
}

export function parseTextProps(props: any): LanguageDict {
    const lang = props.lang as LanguageName
    const text = props.text as LanguageDict
    return { ...translations[lang], ...text }
}
