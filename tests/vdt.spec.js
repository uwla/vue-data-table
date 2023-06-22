import { mount } from '@vue/test-utils';
import VueDataTable from '../src/components/DataTable.vue'


test('creates a todo', function() {
    const wrapper = mount(VueDataTable, {
        propsData: {
            data: [],
            columnKeys: []
        }
    })
    expect(wrapper.findAll('td')).toHaveLength(1)
})
