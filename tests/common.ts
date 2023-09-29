import { mount } from '@vue/test-utils'
import { faker } from '@faker-js/faker'
import { components } from '../src/main'
import VueDataTable from '../src/components/DataTable.vue'

////////////////////////////////////////////////////////////////////////////////
// DATA

// number of fake entries
// It must be greater than 300 for some "searched terms" to appear in the
// dataset, otherwise the tests for "searching data" will be meaningless
export const n = 400

// aliases to make it less verbose to create multiple fake data
let gen = (fn: any) => faker.helpers.multiple(fn, { count: n })
let subset = (arr: any) => faker.helpers.arrayElements(arr, { min: 1, max: arr.length })

// a custom data source for faking data
const ROLES = ['admin', 'chief', 'staff', 'manager', 'executive', 'user']

// generate fake data
const names = gen(faker.person.fullName)
const jobs = gen(faker.person.jobTitle)
const genders = gen(faker.person.sex)
const roles = gen(() => subset(ROLES))

// create an object data array with the fake data
export const data = [] as any
for (let i = 0; i < n; i++)
    data.push({ name: names[i], job: jobs[i], gender: genders[i], roles: roles[i] })

// mount the component
export const wrapper = mount(VueDataTable, {
    global: {
        components,
    },
    props: {
        data: data,
        columns: [
            { key: 'name' },
            { key: 'gender' },
            { key: 'job' },
        ],
        perPageSizes: [n], // this should render all rows in the table
    },
})

// this variable will store the number of emitted events,
// which is needed across tests in order to get the correct event
export let eventCounter = 0

// some aliases
export const searchInput = wrapper.find('.vdt-search input')
export const paginationBtn = wrapper.find('.vdt-pagination-search button')
export const paginationInput = wrapper.find('.vdt-pagination-search input')
const col = (i: any) => wrapper.find(`.vdt-column:nth-child(${i})`)

////////////////////////////////////////////////////////////////////////////////
// HELPERS

// click on something
export async function click(el: any) {
    el.trigger('click')
}

// get the text of the given row
export function rowText(i: any) {
    return wrapper.findAll(`tbody td:nth-child(${i})`).map((el: any) => el.text())
}

// check the rows match the given data
export function testRowsMatchData(data: any) {
    if (data.length == 0) return
    expect(rowText(1)).toEqual(data.map((x: any) =>x.name))
    expect(rowText(2)).toEqual(data.map((x: any) =>x.gender))
    expect(rowText(3)).toEqual(data.map((x: any) =>x.job))
}