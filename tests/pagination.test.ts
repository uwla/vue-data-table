import { arraySafeSort } from '@/utils'
import { click, col, data, n, paginationInput, paginationBtn, searchInput,
testRowsMatchData, wrapper } from './common'

// the per page for the pagination tests
const perPage = 25
const perPageSizes = [25, 50, 100, 200]

test('it displays correct per page sizes', async () => {
    await wrapper.setProps({ perPageSizes })

    let options = wrapper.findAll('.vdt-perpage option')
    let values = []
    for (let option of options as any) values.push(Number(option.element.value))
    expect(values).toEqual(perPageSizes)
})

test('it sets correct per page sizes', async () => {
    await wrapper.setProps({ perPageSizes })

    // test default per page
    let select = wrapper.find('.vdt-perpage select') as any
    expect(Number(select.element.value)).toBe(perPageSizes[0])

    // TODO: fix code below, which is not working

    let options = select.findAll('option')
    
    // test rows length with different per page sizes
    for (let i = 0; i < options.length; i += 1)
    {
        let option = options[i]
        let size = perPageSizes[i]
        await select.setValue(option.element.value)
        testRowsMatchData(data.slice(0, size))
    }
})

test('it changes pages by clicking on buttons', async () => {
    await wrapper.setData({ currentPerPage: perPage })

    // the number of buttons may vary depending on the page,
    // that's why we need to use 'let'
    let buttons = wrapper.findAll('.vdt-pagination .vdt-page-item')
    let l = buttons.length
    let prevBtn = buttons[0]
    let nextBtn = buttons[l - 1]

    // assert we are in the first page
    testRowsMatchData(data.slice(0, perPage))

    // // go to the next page
    await click(nextBtn)
    testRowsMatchData(data.slice(perPage, perPage * 2))

    // // go to the next page again
    await click(nextBtn)
    testRowsMatchData(data.slice(perPage * 2, perPage * 3))

    // go back one page
    await click(prevBtn)
    testRowsMatchData(data.slice(perPage, perPage * 2))

    // first entry of the last page
    let lastPage = Math.ceil(n / perPage)
    let firstEntry = (lastPage - 1) * perPage

    // go to last page by clicking on the last page button
    await click(buttons[l - 2])
    testRowsMatchData(data.slice(firstEntry, firstEntry + perPage))

    // go to first page by clicking on the first button
    await click(buttons[1])
    testRowsMatchData(data.slice(0, perPage))

    // go to the third page by clicking the 'third-page' button
    await click(buttons[3])
    testRowsMatchData(data.slice(perPage * 2, perPage * 3))

    // go to the first page again
    await click(buttons[1])
})

test('it changes pages by setting current page', async () => {
    await wrapper.setData({ currentPerPage: perPage })
    const lastPage = paginationInput.attributes('max') as any

    for (let i = lastPage; i >= 1; i -= 1) {
        await paginationInput.setValue(i)
        await click(paginationBtn)
        let end = perPage * i
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
    for (let search of searchValues) {
        // filter data
        await searchInput.setValue(search)
        let copy = data.filter((x: any) => x.job.includes(search))

        // sort data
        copy = arraySafeSort(copy, (a: any, b: any) => {
            let key = 'gender'
            if (a[key] == b[key]) key = 'job'
            return a[key].localeCompare(b[key])
        })

        let lastPage = Math.ceil(copy.length / perPage)
        for (let i = lastPage; i >= 1; i -= 1) {
            await paginationInput.setValue(i)
            await click(paginationBtn)
            let end = perPage * i
            let start = end - perPage
            testRowsMatchData(copy.slice(start, end))
        }
    }

    // clear search
    await searchInput.setValue('')

    // clear sorting
    await click(col(2))
    await click(col(2))
    await click(col(3))
    await click(col(3))
})
