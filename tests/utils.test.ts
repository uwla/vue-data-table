import { expect, test } from "vitest"
import { stringReplaceFromArray, arraySafeSort, safeCompare } from "../src/utils";

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
    let f : Function = (a: any, b: any) => a - b
    let g : Function = (a: any, b: any) => b - a
    res = arraySafeSort(arr, f)
    expect(res).toEqual([2, 10, 15, 20, 45, null, null])
    res = arraySafeSort(arr, g)
    expect(res).toEqual([45, 20, 15, 10, 2, null, null])

    // keyed
    arr = [{n: 2}, {n: 45}, {n: null}, {n: 10}, {n: 20}, {n: null}, {n: 15}] as any[]
    f = safeCompare(f)
    g = safeCompare(g)
    let f2 = (a: any, b: any) => f(a.n, b.n)
    let g2 = (a: any, b: any) => g(a.n, b.n)
    res = arraySafeSort(arr, f2).map((x: any) => x.n)
    expect(res).toEqual([2, 10, 15, 20, 45, null, null])
    res = arraySafeSort(arr, g2).map((x: any) => x.n)
    expect(res).toEqual([45, 20, 15, 10, 2, null, null])
})