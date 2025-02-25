// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS

export type VueComponent = string | any
export type VueComponentProps = { [key: string]: any }

export type CompareFn = (a: any, b: any) => number
export type SortingMode = "asc" | "desc" | "none"
export type ColumnType = "numeric" | "string" | "array" | "other"
export type Column = {
    compareFunction: CompareFn
    component: VueComponent
    componentProps: VueComponentProps
    collapsed: boolean
    collapsible: boolean
    displayIndex: number
    editable: boolean
    key: string
    id: number
    searchable: boolean
    searchFunction: (data: Cell, search: string, key: string) => boolean
    sortable: boolean
    sortingIndex: number
    sortingMode: SortingMode
    title: string
    type: string
}

export type LanguageName = string
export type LanguageDictKey =
    | "downloadButtonText"
    | "downloadText"
    | "emptyTableText"
    | "infoFilteredText"
    | "infoText"
    | "infoAllText"
    | "nextButtonText"
    | "paginationSearchButtonText"
    | "paginationSearchText"
    | "perPageText"
    | "perPageAllText"
    | "previousButtonText"
    | "searchText"
export type LanguageDictVal = string
export type LanguageDict = Record<LanguageDictKey, LanguageDictVal>
export type Translation = Record<LanguageName, LanguageDict>

export type Cell = { [key: string]: [String, Number, Array, Object] }
export type Data = Cell[]
