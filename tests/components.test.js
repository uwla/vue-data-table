import { mount, flushPromises } from '@vue/test-utils'
import { faker } from '@faker-js/faker'
import VueDataTable from '../src/components/DataTable.vue'

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

// little helper to get the text of the given row
const rowText = (i) =>
    wrapper.findAll(`tbody td:nth-child(${i})`).wrappers.map(el => el.text())

// mount the component
const wrapper = mount(VueDataTable, {
    propsData: {
        data: data,
        columnKeys: ['name', 'gender', 'job'],
        perPageSizes: [n], // this should render all rows in the table
    },
})

// TESTS

test('it shows the correct number of rows', async () => {
    // in order to test to work, it is necessary that  the  computed  properties
    // have been all updated. But there is a little delay  with  the  update  of
    // computed properties. One  workaround  is  to  force  the  update  of  the
    // desired properties.
    await wrapper.setData({ currentPerPage: n })

    // Another workaround would be to wait for some miliseconds like this:
    // setTimeout(() => {
    //     const rows = wrapper.find('tbody tr')
    //     expect(rows.length).toBe(n)
    // }, 300)

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(n)
})

test('it shows the correct data on the table', () => {
    const displayedNames = rowText(1)
    const displayedGenders = rowText(2)
    const displayedJobs = rowText(3)
    expect(displayedNames).toEqual(names)
    expect(displayedGenders).toEqual(genders)
    expect(displayedJobs).toEqual(jobs)
})

test('it filters data', async () => {
    let search = 'Engineer'
    await wrapper.find('.vdt-search input').setValue(search)
    let filteredJobs = jobs.filter(s => s.includes(search))
    expect(rowText(3)).toEqual(filteredJobs)

    // clear the field aftwards
    await wrapper.find('.vdt-search input').setValue("")
    expect(rowText(3)).toEqual(jobs)
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

    // little helper to avoid repetition
    let testIt = () => {
        let orderedNames = copy.map(x => x.name)
        let orderedJobs = copy.map(x => x.job)
        expect(rowText(1)).toEqual(orderedNames)
        expect(rowText(3)).toEqual(orderedJobs)
    }

    // sort by second column, then by third column
    await wrapper.find('th:nth-child(2)').trigger('click')
    await wrapper.find('th:nth-child(3)').trigger('click')
    copy.sort((a,b) => {
        let key = 'gender'
        if (a[key] == b[key]) key = 'job'
        return a[key].localeCompare(b[key])
    })
    testIt()

   // reverse sort by third column
    await wrapper.find('th:nth-child(3)').trigger('click')
    copy.sort((a,b) => {
        let key = 'gender'
        if (a[key] != b[key]) return a[key].localeCompare(b[key])
        key = 'job'
        return b[key].localeCompare(a[key])
    })
    testIt()

    // reverse sort by second column
    await wrapper.find('th:nth-child(2)').trigger('click')
    copy.sort((a,b) => {
        let key = 'gender'
        if (a[key] == b[key]) key = 'job'
        return b[key].localeCompare(a[key])
    })
    testIt()

    // unsort second column
    await wrapper.find('th:nth-child(2)').trigger('click')
    copy.sort((a,b) => a.job.localeCompare(b.job))
    testIt()

    // unsort third column
    await wrapper.find('th:nth-child(3)').trigger('click')
})

// TODO:
//  - test sorting data
//  - test filtering data
//  - test pagination
