import { stringReplaceFromArray, arraySafeSort } from "../src/helpers";

test('test string replacement', function() {
    const str = 'showing :first: to :last: entries of :total: rows'
    const searchValues = [':first:', ':last:', ':total:']
    const replacements = ['10', '20', '100']
    const result = stringReplaceFromArray(str, searchValues, replacements)
    expect(result).toBe('showing 10 to 20 entries of 100 rows')
})

test('test safe sort', function() {
    let
    arr = [2, 45, null, 10, 20, null, 15]
    const fn = (a, b) => a - b
    arr = arraySafeSort(arr, fn)
    expect(arr).toEqual([2, 10, 15, 20, 45, null, null])
})
