import { test } from "vitest"
import { arraySafeSort } from "../src/utils"
import { click, col, data, ROLES, searchInput, testRowsMatchData, wrapper } from "./common"

// ────────────────────────────────────────────────────────────────────────────────
// CUSTOM COLUMN

test('it sets custom order for columns', async () => {
    await wrapper.setProps({
        columns: [
            { key: 'gender', displayIndex: 2 },
            { key: 'job' },
            { key: 'name', displayIndex: 1 },
        ],
    })
    testRowsMatchData(data)
})

test('it uses custom comparison function', async () => {
    let fn = (a: any, b: any) => a.name.length - b.name.length
    await wrapper.setProps({
        columns: [
            { key: 'name', compareFunction: fn },
            { key: 'gender' },
            { key: 'job' },
        ],
    })

    // sort by first column using custom comparison function
    await click(col(1))
    let copy = arraySafeSort(data, fn)
    testRowsMatchData(copy)

    // sort again, which just reverses the sort
    await click(col(1))
    copy = arraySafeSort(data, (a: any, b: any) => fn(b, a))
    testRowsMatchData(copy)

    // click the button again cancels sorting
    await click(col(1))
    testRowsMatchData(data)
})

test('it uses custom search function', async () => {
    let fn = (data: any, search: any) => data.roles.includes(search)

     // update props
    await wrapper.setProps({
        columns: [
            { key: "name" },
            { key: "gender" },
            { key: "job" },
            {
                title: "Roles",
                component: 'CustomComponent2',
                searchable: true,
                searchFunction: fn,
            },
        ],
        defaultColumn: {
            searchable: false
        }
    })

    // test custom search
    let searchValues = ROLES
    for (let search of searchValues)
    {
        await searchInput.setValue(search)
        let copy = data.filter((x: any) => x.roles.includes(search))
        testRowsMatchData(copy)
    }
    await searchInput.setValue("")
})