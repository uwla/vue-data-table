import { mount } from '@vue/test-utils'
import { faker } from '@faker-js/faker'
import VueDataTable from '../src/components/DataTable.vue'

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
        columnKeys: ['name', 'gender', 'job'],
        perPageSizes: [n], // this should render all rows in the table
    },
})

// vue is not updating fast enough... that's why we need a 10ms delay
const DELAY = 10

////////////////////////////////////////////////////////////////////////////////
// HELPERS

// get the text of the given row
const rowText = (i) =>
    wrapper.findAll(`tbody td:nth-child(${i})`).wrappers.map(el => el.text())

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
    let search = 'Engineer'
    await wrapper.find('.vdt-search input').setValue(search)
    let copy = data.filter(x => x.job.includes(search))
    testRowsMatchData(copy)

    // clear the field aftwards
    await wrapper.find('.vdt-search input').setValue("")
    testRowsMatchData(data)
})

test('it sorts data', async () => {
    // clone the array
    let orderedNames = [... names]

    // sort by first column
    await wrapper.find('th:first-child').trigger('click')
    orderedNames.sort()
    expect(rowText(1)).toEqual(orderedNames)

    // sort again, which just reverses the sort
    await wrapper.find('th:first-child').trigger('click')
    orderedNames.reverse()
    expect(rowText(1)).toEqual(orderedNames)

    // click the button again cancels sorting
    await wrapper.find('th:first-child').trigger('click')
    expect(rowText(1)).toEqual(names)
})

test('it sorts only one column', async () => {
    let copy = []

    // sets the sorting mode
    await wrapper.setProps({ sortingMode: 'single' })

    // sort by first column
    await wrapper.find('th:first-child').trigger('click')
    copy = [... data]
    copy.sort((a,b) => a.name.localeCompare(b.name))
    testRowsMatchData(copy)

    // sort by second column
    await wrapper.find('th:nth-child(2)').trigger('click')
    copy = [... data]
    copy.sort((a,b) => a.gender.localeCompare(b.gender))
    testRowsMatchData(copy)

    // sort by third row
    await wrapper.find('th:nth-child(3)').trigger('click')
    copy = [... data]
    copy.sort((a,b) => a.job.localeCompare(b.job))
    testRowsMatchData(copy)

    // reset things
    await wrapper.find('th:nth-child(3)').trigger('click')
    await wrapper.find('th:nth-child(3)').trigger('click')
    await wrapper.setProps({ sortingMode: 'multiple' })
})

test('it sorts filtered data', async () => {
    let search = 'Executive'
    await wrapper.find('.vdt-search input').setValue(search)

    // clone the array
    let names = data.filter(x => x.job.includes(search)).map(x => x.name)
    let orderedNames = [...names]

    // sort by first column
    await wrapper.find('th:first-child').trigger('click')
    orderedNames.sort()
    expect(rowText(1)).toEqual(orderedNames)

    // sort again, which just reverses the sort
    await wrapper.find('th:first-child').trigger('click')
    orderedNames.reverse()
    expect(rowText(1)).toEqual(orderedNames)

    // click the button again cancels sorting
    await wrapper.find('th:first-child').trigger('click')
    expect(rowText(1)).toEqual(names)

    // clear the field aftwards
    await wrapper.find('.vdt-search input').setValue("")
})

test('it sorts multiple rows', async () => {

    // copy the data
    let copy = [...data]

    // sort by second column, then by third column
    await wrapper.find('th:nth-child(2)').trigger('click')
    await wrapper.find('th:nth-child(3)').trigger('click')
    copy.sort((a,b) => {
        let key = 'gender'
        if (a[key] == b[key]) key = 'job'
        return a[key].localeCompare(b[key])
    })
    testRowsMatchData(copy)

   // reverse sort by third column
    await wrapper.find('th:nth-child(3)').trigger('click')
    copy.sort((a,b) => {
        let key = 'gender'
        if (a[key] != b[key]) return a[key].localeCompare(b[key])
        key = 'job'
        return b[key].localeCompare(a[key])
    })
    testRowsMatchData(copy)

    // reverse sort by second column
    await wrapper.find('th:nth-child(2)').trigger('click')
    copy.sort((a,b) => {
        let key = 'gender'
        if (a[key] == b[key]) key = 'job'
        return b[key].localeCompare(a[key])
    })
    testRowsMatchData(copy)

    // unsort second column
    await wrapper.find('th:nth-child(2)').trigger('click')
    copy.sort((a,b) => a.job.localeCompare(b.job))
    testRowsMatchData(copy)

    // unsort third column
    await wrapper.find('th:nth-child(3)').trigger('click')
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
    await nextBtn.trigger('click')
    testRowsMatchData(data.slice(perPage, perPage*2))

    // go to the next page again
    await nextBtn.trigger('click')
    testRowsMatchData(data.slice(perPage*2, perPage*3))

    // go back one page
    await prevBtn.trigger('click')
    testRowsMatchData(data.slice(perPage, perPage*2))

    // first entry of the last page
    let lastPage = Math.ceil(n/perPage)
    let firstEntry = (lastPage - 1) * perPage

    // go to last page by clicking on the last page button
    await buttons.at(l-2).trigger('click')
    testRowsMatchData(data.slice(firstEntry, firstEntry + perPage))

    // go to first page by clicking on the first button
    await buttons.at(1).trigger('click')
    testRowsMatchData(data.slice(0, perPage))

    // go to the third page by clicking the 'third-page' button
    await buttons.at(2).trigger('click')
    testRowsMatchData(data.slice(perPage*2, perPage*3))

})

test('it changes pages by setting current page', async () => {
    const paginationInput = wrapper.find('.vdt-pagination input')
    const lastPage = paginationInput.attributes('max')

    for (let i = 1; i <= lastPage; i+=1) {
        await paginationInput.setValue(i)
        let end = perPage*i
        let start = end - perPage
        testRowsMatchData(data.slice(start, end))
    }
})

// test('it shows the correct number of entries', async () => {
//
// })

// TODO:
//  - test sorting data
//  - test filtering data
//  - test pagination
