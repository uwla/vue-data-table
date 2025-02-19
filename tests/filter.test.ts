import { expect, test } from "vitest"
import translations from "../src/lang"
import { stringReplaceFromArray } from "../src/utils"
import { data, n, searchInput, testRowsMatchData, wrapper } from "./common"

test("it filters data", async () => {
    const searchValues = ["Engineer", "Executive", "Designer", "Manager"]
    for (const search of searchValues) {
        await searchInput.setValue(search)
        const copy = data.filter((x: any) => x.job.includes(search))
        testRowsMatchData(copy)
    }

    // clear the field afterwards
    await searchInput.setValue("")
    testRowsMatchData(data)
})

test("it shows correct text for filtered data", async () => {
    const searchValues = ["Engineer", "Executive"]
    for (const search of searchValues) {
        await searchInput.setValue(search)

        // test the text of filtered data
        const copy = data.filter((x: any) => x.job.includes(search))
        const m = copy.length
        const f = m > 0 ? 1 : 0
        let text = translations["en"]["infoFilteredText"]
        const placeholders = [":first", ":last", ":filtered", ":total"]
        text = stringReplaceFromArray(text, placeholders, [f, m, m, n])
        expect(wrapper.find(".vdt-info").text()).toBe(text)
    }

    // clear the field afterwards
    await searchInput.setValue("")
})

test("it filters data on multiple columns", async () => {
    const searchValues = ["na", "si", "te"]
    for (const search of searchValues) {
        await searchInput.setValue(search)
        const copy = data.filter(function (x: any) {
            return (
                x.name.toLowerCase().includes(search) ||
                x.job.toLowerCase().includes(search)
            )
        })
        testRowsMatchData(copy)
    }

    await searchInput.setValue("")
})

test("it filters only searchable columns", async () => {
    await wrapper.setProps({
        columns: [
            { key: "name" },
            { key: "gender", searchable: false },
            { key: "job", searchable: false },
        ],
    })

    // if the gender column were searchable,
    // then all rows would match because they all contain 'Male' or 'Female'
    const searchValues = ["fe", "ma", "le"]
    for (const search of searchValues) {
        await searchInput.setValue(search)
        const copy = data.filter((x: any) =>
            x.name.toLowerCase().includes(search)
        )
        testRowsMatchData(copy)
    }

    // now try it with the default column set to not sort
    await wrapper.setProps({
        columns: [{ key: "name" }, { key: "gender" }, { key: "job" }],
        defaultColumn: { searchable: false },
    })

    for (const search of searchValues) {
        await searchInput.setValue(search)

        // empty table will show a single row: "no records found" message
        expect(wrapper.findAll("tbody tr").length).toBe(1)
    }

    // clear the field afterwards
    await searchInput.setValue("")

    // reset columns
    await wrapper.setProps({
        columns: [{ key: "name" }, { key: "gender" }, { key: "job" }],
        defaultColumn: { searchable: true },
    })
})
