import { mount } from '@vue/test-utils'
import { faker } from '@faker-js/faker'
import VueDataTable from '../src/components/DataTable.vue'
import VdtActionButtons from "../src/components/ActionButtons/ActionButtons.vue"
import { stringReplaceFromArray, arraySafeSort } from '../src/helpers'
import translations from '../src/lang'

////////////////////////////////////////////////////////////////////////////////
// DATA

// number of fake entries
const n = 400

// generate fake data
const names = faker.helpers.multiple(faker.person.fullName, { count: n })
const jobs = faker.helpers.multiple(faker.person.jobTitle, { count: n })
const genders = faker.helpers.multiple(faker.person.sex, { count: n })

// create an object data array
const data = []
for (let i = 0; i < n; i++)
    data.push({ name: names[i], job: jobs[i], gender: genders[i] })

// mount the component
const wrapper = mount(VueDataTable, {
    propsData: {
        data: data,
        columns: [
            { key: 'name' },
            { key: 'gender' },
            { key: 'job' },
        ],
        perPageSizes: [n], // this should render all rows in the table
    },
})

const searchInput = wrapper.find('.vdt-search input')
const paginationBtn = wrapper.find('.vdt-pagination-search button')
const paginationInput = wrapper.find('.vdt-pagination-search input')
const col = (i) => wrapper.find(`.vdt-column:nth-child(${i})`)

////////////////////////////////////////////////////////////////////////////////
// HELPERS

// click on something
async function click(el) {
    el.trigger('click')
}

// get the text of the given row
function rowText(i) {
    return wrapper.findAll(`tbody td:nth-child(${i})`).wrappers.map(el => el.text())
}

// check the rows match the given data
function testRowsMatchData(data) {
    expect(rowText(1)).toEqual(data.map(x=>x.name))
    expect(rowText(2)).toEqual(data.map(x=>x.gender))
    expect(rowText(3)).toEqual(data.map(x=>x.job))
}

////////////////////////////////////////////////////////////////////////////////
// TESTS

test('it shows the correct data on the table', async () => {
    testRowsMatchData(data)
})

test('it filters data', async () => {
    let searchValues = ['Engineer', 'Executive', 'Designer', 'Manager']
    for (let search of searchValues)
    {
        await searchInput.setValue(search)

        // test filtered rows
        let copy = data.filter(x => x.job.includes(search))
        testRowsMatchData(copy)

        // test the text of filtered data
        let m = copy.length
        let f = (m > 0) ? 1 : 0
        let text = translations["en"]["infoFilteredText"]
        let placeholders = [':first', ':last', ':filtered', ':total']
        text = stringReplaceFromArray(text, placeholders, [f, m, m, n])
        expect(wrapper.find('.vdt-info').text()).toBe(text)
    }

    // clear the field aftwards
    await searchInput.setValue("")
    testRowsMatchData(data)
})

test('it filters data on multiple columns', async () => {
    let searchValues = ["na", "si", "te"]
    for (let search of searchValues)
    {
        await searchInput.setValue(search)
        let copy = data.filter(function(x) {
            return x.name.toLowerCase().includes(search) ||
                    x.job.toLowerCase().includes(search)
        })
        testRowsMatchData(copy)
    }

    await searchInput.setValue("")
})

test('it filters only searchable columns', async () => {
    await wrapper.setProps({
        columns: [
            { key: 'name' },
            { key: 'gender', searchable: false },
            { key: 'job', searchable: false },
        ]
    })

    // if the gender column were searchable,
    // then all rows would match because they all contain 'Male' or 'Female'
    let searchValues = ['fe', 'ma']
    for (let search of searchValues)
    {
        await searchInput.setValue(search)
        let copy = data.filter(x => x.name.toLowerCase().includes(search))
        testRowsMatchData(copy)
    }

    // clear the field aftwards
    await searchInput.setValue("")

    // reset columns
    await wrapper.setProps({
        columns: [
            { key: 'name' },
            { key: 'gender' },
            { key: 'job' },
        ]
    })
})

test('it sorts data', async () => {
    let keys = ['name', 'gender', 'job']
    let c, copy, key, i
    for (i = 0; i < keys.length; i+= 1)
    {
        key = keys[i]
        c = col(i+1)

        await click(c)
        copy = arraySafeSort(data, (a,b) => a[key].localeCompare(b[key]))
        testRowsMatchData(copy)

        await click(c)
        copy = arraySafeSort(data, (b,a) => a[key].localeCompare(b[key]))
        testRowsMatchData(copy)

        await click(c)
        testRowsMatchData(data)
    }
})

// test('it sorts only one column', async () => {
//     let arr
//
//     // sets the sorting mode
//     await wrapper.setProps({ sortingMode: 'single' })
//
//     // // sort by first column
//     await click(col(1))
//     arr = arraySafeSort(data, (a,b) => a.name.localeCompare(b.name))
//     testRowsMatchData(arr)
//
//     // // sort by second column
//     // await click(col(2))
//     // arr = arraySafeSort(data, (a,b) => a.gender.localeCompare(b.gender))
//     // testRowsMatchData(arr)
//
//     // sort by third column
//     // await click(col(3))
//     // arr = arraySafeSort(data, (a,b) => a.job.localeCompare(b.job))
//     // testRowsMatchData(arr)
//
//     // reset things
//     await click(col(1))
//     await click(col(1))
//     await wrapper.setProps({ sortingMode: 'multiple' })
// })

test('it sorts filtered data', async () => {
    let search = 'Executive'
    await searchInput.setValue(search)

    // clone the array
    let names = data.filter(x => x.job.includes(search)).map(x => x.name)
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

    // clear the field aftwards
    await wrapper.find('.vdt-search input').setValue("")
})

test('it sorts multiple rows', async () => {
    // copy the data
    let copy

    // sort by second column, then by third column
    await click(col(2))
    await click(col(3))
    copy = arraySafeSort(data, (a,b) => {
        let key = 'gender'
        if (a[key] == b[key]) key = 'job'
        return a[key].localeCompare(b[key])
    })
    testRowsMatchData(copy)

   // reverse sort by third column
    await click(col(3))
    copy = arraySafeSort(data, (a,b) => {
        let key = 'gender'
        if (a[key] != b[key]) return a[key].localeCompare(b[key])
        key = 'job'
        return b[key].localeCompare(a[key])
    })
    testRowsMatchData(copy)

    // reverse sort by second column
    await click(col(2))
    copy = arraySafeSort(data, (a,b) => {
        let key = 'gender'
        if (a[key] == b[key]) key = 'job'
        return b[key].localeCompare(a[key])
    })
    testRowsMatchData(copy)

    // unsort second column
    await click(col(2))
    copy = arraySafeSort(data, (a,b) => b.job.localeCompare(a.job))
    testRowsMatchData(copy)

    // unsort third column
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

    // 'unsort' it
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

// the per page for the pagination tests
const perPage = 25
const perPageSizes = [25, 50, 100, 200]

test('it displays correct per page sizes', async () => {
    await wrapper.setProps({ perPageSizes })

    let options = wrapper.findAll('.vdt-perpage option').wrappers
    let values = []
    for (let option of options)
        values.push(Number(option.element.value))
    expect(values).toEqual(perPageSizes)
})

test('it sets correct per page sizes', async () => {
    await wrapper.setProps({ perPageSizes })

    // test default per page
    let select = wrapper.find('.vdt-perpage select')
    expect(Number(select.element.value)).toBe(perPageSizes[0])

    // // test rows length with different per page sizes
    // for (let size of perPageSizes)
    // {
    //     await select.setValue(size)
    //     testRowsMatchData(data.slice(0, size))
    // }
})

test('it changes pages by clicking on buttons', async () => {
    await wrapper.setData({ currentPerPage: perPage })

    // the number of buttons may vary depending on the page,
    // that's why we need to use 'let'
    let buttons = wrapper.findAll('.vdt-pagination .vdt-page-item')
    let l = buttons.length
    let prevBtn = buttons.at(0)
    let nextBtn = buttons.at(l-1)

    // assert we are in the first page
    testRowsMatchData(data.slice(0, perPage))

    // // go to the next page
    await click(nextBtn)
    testRowsMatchData(data.slice(perPage, perPage*2))

    // // go to the next page again
    await click(nextBtn)
    testRowsMatchData(data.slice(perPage*2, perPage*3))

    // go back one page
    await click(prevBtn)
    testRowsMatchData(data.slice(perPage, perPage*2))

    // first entry of the last page
    let lastPage = Math.ceil(n/perPage)
    let firstEntry = (lastPage - 1) * perPage

    // go to last page by clicking on the last page button
    await click(buttons.at(l-2))
    testRowsMatchData(data.slice(firstEntry, firstEntry + perPage))

    // go to first page by clicking on the first button
    await click(buttons.at(1))
    testRowsMatchData(data.slice(0, perPage))

    // go to the third page by clicking the 'third-page' button
    await click(buttons.at(3))
    testRowsMatchData(data.slice(perPage*2, perPage*3))

    // go to the first page again
    await click(buttons.at(1))
})

test('it changes pages by setting current page', async () => {
    await wrapper.setData({ currentPerPage: perPage })
    const lastPage = paginationInput.attributes('max')

    for (let i = lastPage; i >= 1 ; i-=1)
    {
        await paginationInput.setValue(i)
        await click(paginationBtn)
        let end = perPage*i
        let start = end - perPage
        testRowsMatchData(data.slice(start, end))
    }
})


test('it changes pages on filtered data sorted by multiple columns', async () => {
    // set smaller per page sizes
    let perPage = 10
    await wrapper.setProps({ perPageSizes: [perPage] })
    await wrapper.setData({ currentPerPage: perPage })

    // sort by second column, then by third column
    await click(col(2))
    await click(col(3))

    let searchValues = ['Engineer', 'Manager']
    for (let search of searchValues)
    {
        // filter data
        await searchInput.setValue(search)
        let copy = data.filter(x => x.job.includes(search))

        // sort data
        copy = arraySafeSort(copy, (a,b) => {
            let key = 'gender'
            if (a[key] == b[key]) key = 'job'
            return a[key].localeCompare(b[key])
        })

        let lastPage = Math.ceil(copy.length/perPage)
        for (let i = lastPage; i >= 1; i-=1)
        {
            await paginationInput.setValue(i)
            await click(paginationBtn)
            let end = perPage*i
            let start = end - perPage
            testRowsMatchData(copy.slice(start, end))
        }
    }

    // clear search
    await searchInput.setValue("")

    // clear sorting
    await click(col(2))
    await click(col(2))
    await click(col(3))
    await click(col(3))
})

test('it renders custom components', async () => {
    // The component to test
    const customComponent = {
        props: { data: Object },
        render(h) {
            return h('p', [
                h('b', this.data.name),
                ' works as ',
                h('i', this.data.job)
            ]);
        }
    }

    // use this component in the first column
    await wrapper.setProps({
        columns: [
            { title: "Person info", component: customComponent },
            { key: 'gender' },
        ],
        perPageSizes: [n],
    })

    // for some reason, computed properties are not upadting fast enough
    // for the tests to run, so it is neccessary to set this data property
    await wrapper.setData({ currentPerPage: n })

    // get the text to test, which is within by bold and italitc tags
    let _names = wrapper.findAll("tbody td b").wrappers.map(t => t.text())
    let _jobs = wrapper.findAll("tbody td i").wrappers.map(t => t.text())

    expect(_names).toEqual(names)
    expect(_jobs).toEqual(jobs)
})

test('it emmits user events from custom components', async () => {
    await wrapper.setProps({
        columns: [
            { key: 'name' },
            { key: 'gender' },
            { key: 'job' },
            { title: 'actions', component: VdtActionButtons },
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

    //
    const event = wrapper.emitted('userEvent')

    // assert event has been emitted
    expect(event).toBeTruthy()

    // assert event count
    expect(event.length).toBe(clickedButtons.length)

    let eventCounter = 0
    for (let clicked of clickedButtons) {
        // determine the payload
        let row = clicked[0]
        let action = clicked[1]
        let payload = [{ action: action, data: data[row-1] }]

        // assert payload
        expect(event[eventCounter]).toEqual(payload)

        // increment counter
        eventCounter += 1
    }
})

test('it sets custom order for columns', async () => {
    await wrapper.setProps({
        columns: [
            { key: 'gender', index: 2 },
            { key: 'job' },
            { key: 'name', index: 1 },
        ],
    })
    testRowsMatchData(data)
})

test('it uses custom comparison function', async () => {
    let fn = (a, b) => a.name.length - b.name.length
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
    copy = arraySafeSort(data, (a,b)=>fn(b,a))
    testRowsMatchData(copy)

    // click the button again cancels sorting
    await click(col(1))
    testRowsMatchData(data)
})

// TODO:
// - test custom search function