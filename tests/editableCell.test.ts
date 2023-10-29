import { expect, test } from "vitest"
import { click, data, n, testRowsMatchData, wrapper } from "./common"

test('it can edit editable cells', async () => {
    // the column keys
    const columnKeys = ['name', 'gender', 'job']

    // update props
    await wrapper.setProps({
        data,
        columns: columnKeys.map(key => ({ key, editable: true })),
        perPageSizes: [n],
    })

    // first, make sure it matches the data
    testRowsMatchData(data)

    // the current event
    let currentEvent = 0

    // test editing three columns
    for (let j = 1; j <= 3; j += 1)
    {
        const cells = wrapper.findAll(`tbody tr td:nth-child(${j})`) as any

        // test editing the first two rows
        for (let i = 0; i <= 2; i+= 1 )
        {
            const cell = cells[i]
            const editBtn = cell.find('.vdt-action-edit')
            expect(editBtn.exists()).toBe(true)

            // input should be hidden by default
            let input = cell.find('input')
            expect(input.exists()).toBe(false)

            // click button, which shows input to edit the value
            await click(editBtn)
            input = cell.find('input')
            expect(input.exists()).toBe(true)

            // set value
            await input.setValue('new value')

            // new event
            const confirmBtn = cell.find('.vdt-action-confirm')
            await click(confirmBtn)

            // the events to be emitted
            let events = wrapper.emitted('userEvent') as any

            // increment event counter and, assert event was emitted
            currentEvent += 1
            expect(events.length).toBe(currentEvent)

            // get the event payload
            const event = events[currentEvent - 1]
            const payload = event[0]

            // assert payload matches the expect format
            expect(payload).toMatchObject({
                action: 'updateCell',
                value: 'new value',
                key: columnKeys[j-1],
                data: data[i],
            })
        }
    }
})