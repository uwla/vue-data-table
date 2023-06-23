import { mount } from '@vue/test-utils'
import { translations } from '../src/lang'
import VueDataTable from '../src/components/DataTable.vue'


test('test table text matches language', function() {

    const text2cssSelector = {
        downloadButtonText: ".vdt-export button",
        downloadText: ".vdt-export span",
        emptyTableText: ".vdt-empty-body",
        // infoFilteredText: "Showing :first to :last of :filtered (filtered from :total entries)",
        // infoText: "Showing :first to :last of :total entries",
        nextButtonText: ".vdt-page-item:last-child",
        paginationSearchButtonText: ".vdt-pagination-search button",
        paginationSearchText: ".vdt-pagination-search span",
        // perPageText: "Show :entries entries",
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
            expect(wrapper.find(selector).text()).toBe(text)
        }
    }
})
