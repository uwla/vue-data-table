/**
 * Compares two numbers
 * @param {String} a
 * @param {String} b
 * @returns {Boolean}
 */
export function compareNumbers(a, b) {
	return b - a;
}

/**
 * Performs a case-insensitive comparison of two strings
 * @param {String} a
 * @param {String} b
 * @returns {Boolean}
 */
export function compareStrings(a, b) {
	return  a.toLowerCase().localeCompare(b.toLowerCase())
}

/**
 * Capitalize first letter and separate words by space
 * @param {String} str
 * @returns {String}
 */
export function toTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/[-_]/ig, ' ')
}

/**
 * Get the greatest value of two numbers
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export function max(a, b) {
	return (a > b) ? a : b;
}

/**
 * Get the lowest value of two numbers
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export function min(a, b) {
	return (a < b) ? a : b;
}

/**
 * Get the lowest integer higher than n
 * @param {Number} n
 * @returns {Number}
 */
export function ceil(n) {
	return Math.ceil(n)
}

/**
 * Get the highest integer lower than n
 * @param {Number} n
 * @returns {Number}
 */
export function floor(n) {
	return Math.floor(n)
}

/**
 * Replace multiple substrings in the given string from the matching arrays.
 * @param {string} target
 * @param {Array} searchValues
 * @param {Array} replacements
 * @returns {String}
 */
export function stringReplaceFromArray(target, searchValues, replacements) {
	for (let i = 0; i < searchValues.length; i++)
		target = target.replace(searchValues[i], replacements[i])
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
	var range = [];
	for (let i = min; i <= max; i += step)
		range.push(i)
	return range
}

/**
 * Indicates if the variable is a number
 * @param {*} variable
 * @returns {Boolean}
 */
export function isNumber(variable) {
	return typeof variable === "number"
}

/**
 * Indicates if the variable is a string
 * @param {*} variable
 * @returns {Boolean}
 */
export function isString(variable) {
	return typeof variable === "string"
}

/**
 * Indicates if the variable is null, undefined, or empty string
 * @param {*} variable
 * @returns {Boolean}
 */
export function isNullable(variable) {
	return variable === null || variable === "" || variable === undefined;
}

/**
 * Sort an array, but skip null values in the array
 * @param {Array} array
 * @param {Function} compareFunction
 * @returns {void}
 */
export function arraySafeSort(array, compareFunction) {
	array.sort((a, b) => (isNullable(a) || isNullable(b)) ? 0 : compareFunction(a, b))
}

/**
 * Sort an array of objects (representing the table) by the given column
 * @param {Array} data
 * @param {Array} column
 * @returns {void}
 */
export function sortDataByColumn(data, column) {
	const { key } = column;
	let compareFunction;
	/* pick up the compare function, allowing user to set a custom one */
	if (column.sortingFunction) {
		compareFunction = column.sortingFunction;
	} else if (column.type === 'number') {
		compareFunction = (a, b) => Number(a[key]) - Number(b[key]);
	} else {
		compareFunction = (a, b) => compareStrings(a[key], b[key]);
	}

	/* sort */
	if (column.sortingMode === "desc") {
		arraySafeSort(data, (a, b) => compareFunction(b, a))
	} else {
		arraySafeSort(data, (a, b) => compareFunction(a, b))
	}
}

/**
 * Pick properties from an object, returning new object
 * @param {Object} source
 * @param {String} ...keys
 * @returns {Object}
 */
export function pickFromObject(source, ...keys) {
	let newObject = {}
	for (let key of keys)
		newObject[key] = source[key]
	return newObject
}

/**
 * Try to get the event target value without causing errors
 * @returns {*}
 */
export function getEventTargetValue(event) {
	event = event || window.event;
	var target;

	if (event !== undefined)
		target = event.target || event.srcElement;

	if (target !== undefined)
		return target.value;
}
