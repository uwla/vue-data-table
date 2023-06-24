import { globalDefaultColumn, parseColumnProps } from "../src/parser"

test('test parsing columns', function() {
    let columns = [
        { key: 'name' },
        { key: 'mail', title: 'Email address' },
        { key: 'age', type: 'number' },
        { key: 'gender', searchable: false },
        { key: 'phone_number', sortable: false },
    ]
    let defaultColumn = globalDefaultColumn
    let parsed = parseColumnProps({ columns, defaultColumn })

    //
    expect(typeof parsed).toBe(typeof columns)
    expect(parsed.length).toBe(columns.length)

    // name column
    expect(parsed[0].title).toBe('Name')
    expect(parsed[0].type).toBe('string')
    expect(parsed[0].sortable).toBe(defaultColumn.sortable)
    expect(parsed[0].searchable).toBe(defaultColumn.searchable)

    // email column
    expect(parsed[1].title).toBe('Email address')

    // age column
    expect(parsed[2].title).toBe('Age')
    expect(parsed[2].type).toBe('number')

    // gender column
    expect(parsed[3].searchable).toBe(false)

    // phone number column
    expect(parsed[4].title).toBe('Phone Number')
    expect(parsed[4].sortable).toBe(false)
})

test('test parsing column keys', function() {
    let columnKeys = ['first_name', 'phone_number', 'streetName', 'companyName']
    let parsed = parseColumnProps({ columnKeys })

    expect(typeof parsed).toBe(typeof columnKeys)
    expect(parsed.length).toBe(columnKeys.length)

    // test title of the columns
    expect(parsed[0].title).toBe('First Name')
    expect(parsed[1].title).toBe('Phone Number')
    expect(parsed[2].title).toBe('Street Name')
    expect(parsed[3].title).toBe('Company Name')

    // test fields
    let defaultColumn = globalDefaultColumn
    for (let col of parsed) {
        for (let key in defaultColumn) {
            // skip object fields
            if (typeof defaultColumn[key] == typeof {}) continue

            // verify only scalar  fields
            expect(col[key]).toBe(defaultColumn[key])
        }
    }
})
