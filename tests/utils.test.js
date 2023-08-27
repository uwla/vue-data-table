import { stringReplaceFromArray, arraySafeSort, safeCompare } from "../src/helpers";

test('test string replacement', function() {
    const str = 'showing :first: to :last: entries of :total: rows'
    const searchValues = [':first:', ':last:', ':total:']
    const replacements = ['10', '20', '100']
    const result = stringReplaceFromArray(str, searchValues, replacements)
    expect(result).toBe('showing 10 to 20 entries of 100 rows')
})

test('test safe sort', function() {
    let arr = [2, 45, null, 10, 20, null, 15]
    let res
    let f = safeCompare((a, b) => a - b)
    let g = safeCompare((a, b) => b - a)
    res = arraySafeSort(arr, f)
    expect(res).toEqual([2, 10, 15, 20, 45, null, null])
    res = arraySafeSort(arr, g)
    expect(res).toEqual([45, 20, 15, 10, 2, null, null])

    // keyed
    arr = [{n: 2}, {n: 45}, {n: null}, {n: 10}, {n: 20}, {n: null}, {n: 15}]
    let f2 = (a, b) => f(a.n, b.n)
    let g2 = (a, b) => g(a.n, b.n)
    res = arraySafeSort(arr, f2).map(x => x.n)
    expect(res).toEqual([2, 10, 15, 20, 45, null, null])
    res = arraySafeSort(arr, g2).map(x => x.n)
    expect(res).toEqual([45, 20, 15, 10, 2, null, null])
})
