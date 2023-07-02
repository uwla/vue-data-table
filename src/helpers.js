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
 * Sort an array, but skip null values in the array
 * @param {Array} array
 * @param {Function} compareFunction
 * @returns {void}
 */
export function arraySafeSort(array, compareFunction) {
    array.sort(function(a, b) {
        if (isNullable(a))
            return 1
        if (isNullable(b))
            return -1
        return compareFunction(a,b)
    })
}

/**
 * Sort an array of objects (representing the table) by the given column
 * @param {Array} data
 * @param {Array} column
 * @returns {void}
 */
export function sortDataByColumn(data, column) {
    let { compareFunction, sortingMode } = column

    if (isNullable(compareFunction)) {
        let { key, type } = column
        if (type === "string")
            compareFunction = (a, b) => compareStrings(a[key], b[key])
        if (type === "numeric" || type === "number")
            compareFunction = (a, b) => compareNumbers(a[key], b[key])
    }

    if (sortingMode === "desc")
        arraySafeSort(data, (a, b) => compareFunction(b, a))
    else
        arraySafeSort(data, (a, b) => compareFunction(a, b))
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
    return data[key].toLowerCase().includes(search.toLowerCase())
}

/**
 * Performs search on numeric values
 * @param {Object} data
 * @param {String} search
 * @param {String} key
 * @returns {Boolean}
 */
export function searchNumericColumn(data, search, key) {
    return data[key].toString().includes(search)
}
