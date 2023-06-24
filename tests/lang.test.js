import { mount } from '@vue/test-utils'
import { translations } from '../src/lang'
import VueDataTable from '../src/components/DataTable.vue'


test('test table text matches language', function() {

    const text2cssSelector = {
        downloadButtonText: ".vdt-export button",
        downloadText: ".vdt-export span",
        emptyTableText: ".vdt-empty-body",
        // infoFilteredText: ".vdt-info",
        infoText: ".vdt-info",
        nextButtonText: ".vdt-page-item:last-child",
        paginationSearchButtonText: ".vdt-pagination-search button",
        paginationSearchText: ".vdt-pagination-search span",
        // perPageText: ".vdt-perpage",
        previousButtonText: ".vdt-page-item:first-child",
        searchText: ".vdt-search span",
    }

    // text each language
    for (let lang in translations)
    {
        let translation = translations[lang]
        let wrapper = mount(VueDataTable, {
            propsData: {
                data: [],
                columnKeys: [],
                lang: lang,
            }
        })

        for (let textKey in text2cssSelector)
        {
            let selector = text2cssSelector[textKey]
            let text = translation[textKey]

            // some text have placeholders for the number of rows in the table,
            // which in this case is zero
            text = text.replace(/:(last|first|total|entries)/g, 0)

            expect(wrapper.find(selector).text()).toBe(text)
        }
    }
})
