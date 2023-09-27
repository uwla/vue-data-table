export const SORTING_MODE = {
    ASC: 'asc',
    DESC: 'desc',
    NONE: 'none'
} as { [key: string] : SortingMode }

export const COLUMN_TYPE = {
    NUMERIC: 'numeric',
    STRING: 'string',
    ARRAY: 'array',
    OTHER: 'other',
} as { [key: string] : ColumnType }