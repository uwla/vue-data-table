// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS

type VueComponent = string|any
type VueComponentProps = { [key: string] : any }

type SortingMode = 'asc' | 'desc' | 'none'
type ColumnType = 'numeric' | 'string' | 'array' | 'other'
type Column = {
    compareFunction: Function,
    component: VueComponent
    componentProps: VueComponentProps,
    displayIndex: number,
    editable: boolean,
    key: string,
    id: number,
    searchable: boolean,
    searchFunction: Function,
    sortable: boolean,
    sortingIndex: number,
    sortingMode: SortingMode,
    title: string,
    type: string,
}

type LanguageName = string
type LanguageDictKey =
    'downloadButtonText' |
    'downloadText' |
    'emptyTableText' |
    'infoFilteredText' |
    'infoText' |
    'nextButtonText' |
    'paginationSearchButtonText' |
    'paginationSearchText' |
    'perPageText' |
    'previousButtonText' |
    'searchText';
type LanguageDictVal = string
type LanguageDict = Record<LanguageDictKey, LanguageDictVal>
type Translation = Record<LanguageName, LanguageDict>

type Cell = { [key: string]: any }
type Data = Cell[]