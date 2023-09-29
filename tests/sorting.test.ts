import { arraySafeSort } from "@/utils"
import { click, col, data, rowText, searchInput, testRowsMatchData, wrapper } from "./common"

test('it sorts data', async () => {
    let keys = ['name', 'gender', 'job'] as any
    let c, copy, key : any, i
    for (i = 0; i < keys.length; i+= 1)
    {
        key = keys[i]
        c = col(i+1)

        await click(c)
        copy = arraySafeSort(data, (a: any, b: any) => a[key].localeCompare(b[key]))
        testRowsMatchData(copy)

        await click(c)
        copy = arraySafeSort(data, (b: any, a: any) => a[key].localeCompare(b[key]))
        testRowsMatchData(copy)

        await click(c)
        testRowsMatchData(data)
    }
})


test('it sorts only one column', async () => {
    let arr

    // sets the sorting mode
    await wrapper.setProps({ sortingMode: 'single' })

    // // sort by first column
    await click(col(1))
    arr = arraySafeSort(data, (a: any, b: any) => a.name.localeCompare(b.name))
    testRowsMatchData(arr)

    // // sort by second column
    await click(col(2))
    arr = arraySafeSort(data, (a: any, b: any) => a.gender.localeCompare(b.gender))
    testRowsMatchData(arr)


    // sort by third column
    await click(col(3))
    arr = arraySafeSort(data, (a: any, b: any) => a.job.localeCompare(b.job))
    testRowsMatchData(arr)

    // reverse sort by third column
    await click(col(3))
    arr = arraySafeSort(data, (a: any, b: any) => b.job.localeCompare(a.job))
    testRowsMatchData(arr)

    // reset things
    await click(col(3))
    testRowsMatchData(data)
    await wrapper.setProps({ sortingMode: 'multiple' })
})


test('it sorts filtered data', async () => {
    let search = 'Executive'
    await searchInput.setValue(search)

    // clone the array
    let names = data.filter((x: any) => x.job.includes(search)).map((x: any) => x.name)
    let orderedNames = [...names]

    // sort by first column
    await click(col(1))
    orderedNames.sort()
    expect(rowText(1)).toEqual(orderedNames)

    // sort again, which just reverses the sort
    await click(col(1))
    orderedNames.reverse()
    expect(rowText(1)).toEqual(orderedNames)

    // click the button again cancels sorting
    await click(col(1))
    expect(rowText(1)).toEqual(names)

    // clear the field afterwards
    await wrapper.find('.vdt-search input').setValue("")
})

test('it sorts multiple rows', async () => {
    // copy the data
    let copy

    // sort by second column, then by third column
    await click(col(2))
    await click(col(3))
    copy = arraySafeSort(data, (a: any, b: any) => {
        let key = 'gender'
        if (a[key] == b[key]) key = 'job'
        return a[key].localeCompare(b[key])
    })
    testRowsMatchData(copy)

   // reverse sort by third column
    await click(col(3))
    copy = arraySafeSort(data, (a: any, b: any) => {
        let key = 'gender'
        if (a[key] != b[key]) return a[key].localeCompare(b[key])
        key = 'job'
        return b[key].localeCompare(a[key])
    })
    testRowsMatchData(copy)

    // reverse sort by second column
    await click(col(2))
    copy = arraySafeSort(data, (a: any, b: any) => {
        let key = 'gender'
        if (a[key] == b[key]) key = 'job'
        return b[key].localeCompare(a[key])
    })
    testRowsMatchData(copy)

    // stop sorting second column
    await click(col(2))
    copy = arraySafeSort(data, (a: any, b: any) => b.job.localeCompare(a.job))
    testRowsMatchData(copy)

    // stop sorting third column
    await click(col(3))
    testRowsMatchData(data)
})

test('it sorts only sortable columns', async () => {
    await wrapper.setProps({
        columns: [
            { key: 'name', sortable: false },
            { key: 'gender', sortable: false },
            { key: 'job' },
        ]
    })

    // first and second columns are not sortable
    await click(col(1))
    testRowsMatchData(data)
    await click(col(2))
    testRowsMatchData(data)

    // third column is sortable
    await click(col(3))
    let copy = [...data]
    copy.sort((a,b) => a.job.localeCompare(b.job))
    testRowsMatchData(copy)

    // stop sorting it
    await click(col(3))
    await click(col(3))

    // reset props
    await wrapper.setProps({
        columns: [
            { key: 'name' },
            { key: 'gender' },
            { key: 'job' },
        ]
    })
})