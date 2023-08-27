/**
 * Performs a case-insensitive comparison of two strings
 * @param {String} a
 * @param {String} b
 * @returns {Boolean}
 */
export function compareStrings(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase())
}

/**
 * Perform a comparison of numeric values (possibly strings)
 * @param {String} a
 * @param {String} b
 * @returns {Boolean}
 */
export function compareNumbers(a, b) {
    return Number(a) - Number(b)
}

/**
 * Capitalize the first letter of each word and separate words by space
 * @param {String} str
 * @returns {String}
 */
export function toTitleCase(str) {
    // convert snake case to title case
    str = str.replace(/_/g, ' ');

    // convert camel case to title case
    str = str.replace(/([a-z])([A-Z])/g, '$1 $2');

    // capitalize first letter of each word
    str = str.replace(/\b\w/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())

    // return the result
    return str
}

/**
 * Replace multiple substrings in the given string from the matching arrays.
 * @param {string} target
 * @param {Array} searchValues
 * @param {Array} replacements
 * @returns {String}
 */
export function stringReplaceFromArray(target, searchValues, replacements) {
    for (let i = 0; i < searchValues.length; i++) {
        target = target.replace(searchValues[i], replacements[i])
    }
    return target
}

/**
 * Get an array with the numbers in the specified range
 * @param {Number} min
 * @param {Number} max
 * @param {Number} step=1
 * @returns {Array}
 */
export function range(min, max, step = 1) {
    var range = []
    for (let i = min; i <= max; i += step) {
        range.push(i)
    }
    return range
}

/**
 * Indicates if the variable is null, undefined, or empty string
 * @param {*} variable
 * @returns {Boolean}
 */
export function isNullable(variable) {
    return variable === null || variable === "" || variable === undefined
}

/**
 * Sort an array using stable sort
 * @param {Array} array to be sorted
 * @param {Function} compare function
 * @returns {array}
 */
export function stableSort(arr, compare) {
    return arr.map((item, index) => ({item, index}))
        .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
        .map(({item}) => item)
}
/**
 * Safely compare two items, which may be nullable
 * @param {Function} compare function
 * @returns {Function}
 */
export function stableCompare(compareFunction) {
    return function(a, b) {
        if (isNullable(a)) return 1
        if (isNullable(b)) return -1
        return compareFunction(a,b)
    }
}

/**
 * Safely stable sort an array that may have null elements
 * @param {Array} array
 * @param {Function} compareFunction
 * @returns {Array}
 */
export function arraySafeSort(array, compareFunction) {
    return stableSort(array, stableCompare(compareFunction))
}

/**
 * Sort an array of objects (representing the table) by the given column
 * @param {Array} data
 * @param {Array} column
 * @returns {void}
 */
export function sortDataByColumns(data, columns) {
    let l = columns.length

    let fn = (a, b) => {
        let i = 0
        while (i < l) {
            let c = columns[i]
            let { sortingMode, compareFunction: f } = c

            if (isNullable(f))
            {
                let { key, type } = c
                if (type === "string")
                    f = (a,b) => compareStrings(a[key], b[key])
                if (type === "numeric" || type === "number")
                    f = (a,b) => compareNumbers(a[key], b[key])
            }

            let result
            if (sortingMode == "asc") result = f(a, b)
            else result = f(b, a)

            if (result != 0)
                return result
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
export function getEventTargetValue(event) {
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


/**
 * Performs search on strings
 * @param {Object} data
 * @param {String} search
 * @param {String} key
 * @returns {Boolean}
 */
export function searchStringColumn(data, search, key) {
    return (data[key] || '').toLowerCase().includes(search.toLowerCase())
}

/**
 * Performs search on numeric values
 * @param {Object} data
 * @param {String} search
 * @param {String} key
 * @returns {Boolean}
 */
export function searchNumericColumn(data, search, key) {
    return (data[key] || '').toString().includes(search)
}
