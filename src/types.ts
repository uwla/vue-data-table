// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS

type VueComponent = string|any
type VueComponentProps = { [key: string] : any }

type SortingMode = 'asc' | 'desc' | 'none'
const SORTING_MODE = {
    ASC: 'asc',
    DESC: 'desc',
    NONE: 'none'
} as { [key: string] : SortingMode }

type ColumnType = 'numeric' | 'string' | 'array' | 'other'
const COLUMN_TYPE = {
    NUMERIC: 'numeric',
    STRING: 'string',
    ARRAY: 'array',
    OTHER: 'other',
} as { [key: string] : ColumnType }

type Column = {
    compareFunction: Function,
    component: VueComponent
    componentProps: VueComponentProps,
    displayIndex: number,
    editable: boolean,
    id: number,
    searchable: boolean,
    searchFunction: Function,
    sortable: boolean,
    sortingIndex: number,
    sortingMode: SortingMode,
    title: string,
    type: string,
}

type LanguageDict = {
    perPageText?: string,
    infoText?: string,
    infoFilteredText?: string,
    nextButtonText?: string,
    previousButtonText?: string,
    paginationSearchText?: string,
    paginationSearchButtonText?: string,
    searchText?: string,
    emptyTableText?: string,
    downloadText?: string,
    downloadButtonText?: string,
}