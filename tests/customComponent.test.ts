import { expect, test } from "vitest"
import { click, data, jobs, n, names, wrapper } from "./common";

// ────────────────────────────────────────────────────────────────────────────────
// CUSTOM COMPONENT

test('it renders custom components', async () => {
    // use custom component (defined in common.ts) in the first column
    await wrapper.setProps({
        columns: [
            { title: "Person info", component: 'CustomComponent1' },
            { key: 'gender' },
        ],
        perPageSizes: [n],
    })

    // for some reason, computed properties are not updating fast enough
    // for the tests to run, so it is necessary to set this data property
    await wrapper.setData({ currentPerPage: n })

    // get the text to test, which is within by bold and italic tags
    let _names = wrapper.findAll("tbody td b").map(t => t.text())
    let _jobs = wrapper.findAll("tbody td i").map(t => t.text())

    expect(_names).toEqual(names)
    expect(_jobs).toEqual(jobs)
})

test('it emits user events from custom components', async () => {
    await wrapper.setProps({
        columns: [
            { key: 'name' },
            { key: 'gender' },
            { key: 'job' },
            { title: 'actions', component: 'vdt-action-buttons' },
        ],
    })

    // which buttons to click
    let clickedButtons = [
        [2, 'view'],
        [5, 'edit'],
        [7, 'edit'],
        [10, 'delete'],
    ]

    // click many buttons
    for (let clicked of clickedButtons) {
        let row = clicked[0]
        let action = clicked[1]
        let selector = `tr:nth-child(${row}) .vdt-action-${action}`
        await click(wrapper.find(selector))
    }

    // Wait until $emits have been handled
    await wrapper.vm.$nextTick()

    // get the event object
    const event = wrapper.emitted('userEvent') as any

    // assert event has been emitted
    expect(event).toBeTruthy()

    // assert event count
    expect(event.length).toBe(clickedButtons.length)

    // the current event
    let currentEvent = 0

    for (let clicked of clickedButtons) {
        // determine the payload
        let row = clicked[0] as any
        let action = clicked[1] as any
        let payload = [{ action: action, data: data[row-1] }]

        // assert payload
        expect(event[currentEvent]).toEqual(payload)

        // increment counter
        currentEvent += 1
    }
})