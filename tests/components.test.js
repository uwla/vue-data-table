import { mount } from '@vue/test-utils'
import { faker } from '@faker-js/faker'
import VueDataTable from '../src/components/DataTable.vue'
import {stringReplaceFromArray} from '../src/helpers'
import translations from '../src/lang'

////////////////////////////////////////////////////////////////////////////////
// DATA

// number of fake entries
const n = 800

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

const col1 = wrapper.find('th:nth-child(1)')
const col2 = wrapper.find('th:nth-child(2)')
const col3 = wrapper.find('th:nth-child(3)')
const searchInput = wrapper.find('.vdt-search input')
const paginationInput = wrapper.find('.vdt-pagination input')

// vue is not updating fast enough... that's why we need a 10ms delay
const DELAY = 10

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
    setTimeout(() => {
        expect(rowText(1)).toEqual(data.map(x=>x.name))
        expect(rowText(2)).toEqual(data.map(x=>x.gender))
        expect(rowText(3)).toEqual(data.map(x=>x.job))
    }, DELAY)
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
        await wrapper.find('.vdt-search input').setValue(search)
        let copy = data.filter(x => x.job.includes(search))
        testRowsMatchData(copy)

        // also, test the text of filtered data
        let m = copy.length
        let f = (m > 0) ? 1 : 0
        let text = translations["en"]["infoFilteredText"]
        let placeholders = [':first', ':last', ':filtered', ':total']
        text = stringReplaceFromArray(text, placeholders, [f, m, m, n])
        expect(wrapper.find('.vdt-info').text()).toBe(text)
    }

    // clear the field aftwards
    await wrapper.find('.vdt-search input').setValue("")
    testRowsMatchData(data)
})

test('it filters only searchable columns', async () => {
    await wrapper.setProps({
        columns: [
            { key: 'name' },
            { key: 'gender', searchable: false },
            { key: 'job', searchable: false },
        ]
    })

    let searchValues = ['Fe', 'Ma']
    for (let search of searchValues)
    {
        await searchInput.setValue(search)
        let copy = data.filter(x => x.name.includes(search))
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
    // clone the array
    let orderedNames = [... names]

    // sort by first column
    await click(col1)
    orderedNames.sort()
    expect(rowText(1)).toEqual(orderedNames)

    // sort again, which just reverses the sort
    await click(col1)
    orderedNames.reverse()
    expect(rowText(1)).toEqual(orderedNames)

    // click the button again cancels sorting
    await click(col1)
    expect(rowText(1)).toEqual(names)
})

test('it sorts only one column', async () => {
    let copy = []

    // sets the sorting mode
    await wrapper.setProps({ sortingMode: 'single' })

    // sort by first column
    await click(col1)
    copy = [... data]
    copy.sort((a,b) => a.name.localeCompare(b.name))
    testRowsMatchData(copy)

    // sort by second column
    await click(col2)
    copy = [... data]
    copy.sort((a,b) => a.gender.localeCompare(b.gender))
    testRowsMatchData(copy)

    // sort by third row
    await click(col3)
    copy = [... data]
    copy.sort((a,b) => a.job.localeCompare(b.job))
    testRowsMatchData(copy)

    // reset things
    await click(col3)
    await click(col3)
    await wrapper.setProps({ sortingMode: 'multiple' })
})

test('it sorts filtered data', async () => {
    let search = 'Executive'
    await searchInput.setValue(search)

    // clone the array
    let names = data.filter(x => x.job.includes(search)).map(x => x.name)
    let orderedNames = [...names]

    // sort by first column
    await click(col1)
    orderedNames.sort()
    expect(rowText(1)).toEqual(orderedNames)

    // sort again, which just reverses the sort
    await click(col1)
    orderedNames.reverse()
    expect(rowText(1)).toEqual(orderedNames)

    // click the button again cancels sorting
    await click(col1)
    expect(rowText(1)).toEqual(names)

    // clear the field aftwards
    await wrapper.find('.vdt-search input').setValue("")
})

test('it sorts multiple rows', async () => {
    // copy the data
    let copy = [...data]

    // sort by second column, then by third column
    await click(col2)
    await click(col3)
    copy.sort((a,b) => {
        let key = 'gender'
        if (a[key] == b[key]) key = 'job'
        return a[key].localeCompare(b[key])
    })
    testRowsMatchData(copy)

   // reverse sort by third column
    await click(col3)
    copy.sort((a,b) => {
        let key = 'gender'
        if (a[key] != b[key]) return a[key].localeCompare(b[key])
        key = 'job'
        return b[key].localeCompare(a[key])
    })
    testRowsMatchData(copy)

    // reverse sort by second column
    await click(col2)
    copy.sort((a,b) => {
        let key = 'gender'
        if (a[key] == b[key]) key = 'job'
        return b[key].localeCompare(a[key])
    })
    testRowsMatchData(copy)

    // unsort second column
    await click(col2)
    copy.sort((a,b) => a.job.localeCompare(b.job))
    testRowsMatchData(copy)

    // unsort third column
    await click(col3)
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
    await click(col1)
    testRowsMatchData(data)
    await click(col2)
    testRowsMatchData(data)

    // third column is sortable
    await click(col3)
    let copy = [...data]
    copy.sort((a,b) => a.job.localeCompare(b.job))
    testRowsMatchData(copy)

    // 'unsort' it
    await click(col3)
    await click(col3)

    // reset props
    await wrapper.setProps({
        columns: [
            { key: 'name' },
            { key: 'gender' },
            { key: 'job' },
        ]
    })
})


test('it sets correct per page sizes', async () => {
    let perPageSizes = [25, 50, 100, 200]
    await wrapper.setProps({ perPageSizes })

    // test default per page
    let select = wrapper.find('.vdt-perpage select')
    expect(Number(select.element.value)).toBe(perPageSizes[0])

    // test rows length with different per page sizes
    for (let size of perPageSizes)
    {
        await select.setValue(size)
        testRowsMatchData(data.slice(0, size))
    }
})

// the per page for the pagination tests
const perPage = 25

test('it changes pages by clicking on buttons', async () => {
    await wrapper.setData({ currentPerPage: perPage })

    // the number of buttons may vary depending on the page,
    // that's why we need to use 'let'
    let buttons = wrapper.findAll('.vdt-pagination .vdt-page-item')
    let l = buttons.length
    let nextBtn = buttons.at(0)
    let prevBtn = buttons.at(l-1)

    // assert we are in the first page
    testRowsMatchData(data.slice(0, perPage))

    // go to the next page
    await click(nextBtn)
    testRowsMatchData(data.slice(perPage, perPage*2))

    // go to the next page again
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
    await click(buttons.at(2))
    testRowsMatchData(data.slice(perPage*2, perPage*3))

})

test('it changes pages by setting current page', async () => {
    const lastPage = paginationInput.attributes('max')

    for (let i = 1; i <= lastPage; i+=1)
    {
        await paginationInput.setValue(i)
        let end = perPage*i
        let start = end - perPage
        testRowsMatchData(data.slice(start, end))
    }
})

test('it changes pages on filtered data sorted by multiple columns', async () => {
    // set smaller per page sizes
    await wrapper.setProps({ perPageSizes: [10, 20, 50], defaultPerPage: 10 })

    // sort by second column, then by third column
    await click(col2)
    await click(col3)

    let searchValues = ['Engineer', 'Manager']
    for (let search of searchValues)
    {
        // filter data
        await searchInput.setValue(search)
        let copy = data.filter(x => x.job.includes(search))

        // sort data
        copy.sort((a,b) => {
            let key = 'gender'
            if (a[key] == b[key]) key = 'job'
            return a[key].localeCompare(b[key])
        })

        let lastPage = Math.ceil(copy.length/10)
        for (let i = 1; i <= lastPage; i+=1)
        {
            await paginationInput.setValue(i)
            let end = perPage*i
            let start = end - perPage
            testRowsMatchData(copy.slice(start, end))
        }
    }

    // clear search
    await searchInput.setValue("")

    // clear sorting
    await click(col2)
    await click(col2)
    await click(col3)
    await click(col3)
})

// TODO:
//  - test sorting data
//  - test filtering data
//  - test pagination
