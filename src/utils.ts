export function
toTitleCase(str: string): string
{
    // convert snake case to title case
    str = str.replace(/_/g, ' ');

    // convert camel case to title case
    str = str.replace(/([a-z])([A-Z])/g, '$1 $2');

    // capitalize first letter of each word
    str = str.replace(/\b\w/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())

    // return the result
    return str
}

// Replace multiple substrings in the given string from the matching arrays.
export function stringReplaceFromArray(target: string, searchValues: string[], replacements: any[]): string {
    for (let i = 0; i < searchValues.length; i++) {
        target = target.replace(searchValues[i], replacements[i])
    }
    return target
}

export function range(min: number, max: number, step: number = 1): number[] {
    var range = []
    for (let i = min; i <= max; i += step) {
        range.push(i)
    }
    return range
}

export function isNullable(variable: any): boolean {
    return variable === null || variable === "" || variable === undefined
}

export function stableSort <T>(arr: T[], compare: Function): T[] {
    return arr.map((item, index) => ({item, index}))
        .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
        .map(({item}) => item)
}

// Safely compare two items, which may be nullable
export function safeCompare(compareFunction: Function): Function {
    return function(a: any, b: any) {
        if (isNullable(a)) return 1
        if (isNullable(b)) return -1
        return compareFunction(a,b)
    }
}

// Safely compare two items by key, which may be nullable
export function safeKeyCompare(compareFunction: Function, key: string) {
    return function(a: any, b: any) {
        if (isNullable(a[key])) return 1
        if (isNullable(b[key])) return -1
        return compareFunction(a[key], b[key])
    }
}

// Reverse a comparison function
export function reverseCompare(compareFunction: Function): Function {
    return (a: any, b: any) => compareFunction(b,a)
}

// Performs a case-insensitive comparison of two strings
export function compareStrings(a: string, b: string): number {
    return a.toLowerCase().localeCompare(b.toLowerCase())
}

// Perform a comparison of numeric values (possibly strings)
export function compareNumbers (a: string|number, b: string|number): number {
    return Number(a) - Number(b)
}

// Safely stable sort an array that may have null elements
export function arraySafeSort<T>(array: T[], compareFunction: Function): T[] {
    return stableSort(array, safeCompare(compareFunction))
}

// Sort an array of objects (representing the table) by the given column
export function sortDataByColumns(data: Data, columns: Column[]) {
    let l = columns.length

    let fn = (a: any, b: any) => {
        let i = 0
        while (i < l) {
            let c = columns[i]
            let { sortingMode, compareFunction: f } = c

            // reverse comparison
            let reverseSearch = (sortingMode === 'desc')

            // get default value for f
            if (isNullable(f))
            {
                let { key, type } = c
                if (type === "string")
                    f = compareStrings
                if (type === "numeric" || type === "number")
                    f = compareNumbers
                if (reverseSearch)
                    f = reverseCompare(f)
                // make it safe to search null keys, and put them last
                f = safeKeyCompare(f, key)
            } else if (reverseSearch) {
                f = reverseCompare(f)
            }

            // get the result
            let result = f(a,b)
            if (result !== 0)
                return result

            // comparison return equal. Proceed to the next comparison
            i += 1
        }
        return 0
    }

    return arraySafeSort(data, fn)
}

/**
 * Cross-browser utility to get the event target value
 * @returns {*}
 */
export function getEventTargetValue(event : any = null) {
    event = event || window.event
    var target
    if (event !== undefined) {
        target = event.target || event.srcElement
    }
    if (target !== undefined) {
        return target.value
    }
    return null
}

// Performs search on strings
export function searchStringColumn(data: Cell, search: string, key: string) {
    return (data[key] || '').toLowerCase().includes(search.toLowerCase())
}

// Performs search on numeric values
export function searchNumericColumn(data: Cell, search: string, key: string) {
    return (data[key] || '').toString().includes(search)
}