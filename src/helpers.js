/**
 * Compares two numbers
 *
 * @param {String} a
 * @param {String} b
 * @return {Boolean}
 */
export function compareNumbers(a, b) {
	if (typeof a !== "number")
		return true
	if (typeof b !== "number")
		return false
	return (b - a) > 0
}

/**
 * Performs a case-insensitive comparison of two strings
 *
 * @param {String} a
 * @param {String} b
 * @return {Boolean}
 */
export function compareStrings(a, b) {
	if (typeof a !== "string" || a === "")
		return true
	if (typeof b !== "string" || b === "")
		return false
	return  a.toLowerCase().localeCompare(b.toLowerCase())
}

/**
 * Capitalize first letter and separate words by space
 *
 * @param {String} str
 * @return {String}
 */
export function toTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/[-_]/ig, ' ')
}
