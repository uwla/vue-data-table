# CHANGELOG

## Vue3 releases

### v2.1.0

- feat: add option to show all entries in per-page
- feat: auto-hide pagination if no pages

### v2.0.1

- fix: TS7016 error

### v2.0.0

- feat: add vue3 support

## Vue2 releases

### v1.2.4

- fix: columns with empty cells not being sorted correctly

### v1.2.3

- fix: plugin crashed when searching text on empty cells
- css: enhance display of editable cells

### v1.2.2

- feat: add built-in editable cells

### v1.1.2

- fix: property `columns` object array being changed by child component

### v1.1.1

- fix: unsupported JS syntax sugar

### v1.1.0

- feat: add support for user-provided search function
- feat: add built-in Action Buttons column
- feat: easy access to events emitted from user-defined cell components

### v1.0.0

- initial release after refactoring of legacy code

## Vue2 legacy releases

### v3.3.3 (legacy)

- css: removes Bootstrap as dependency, replacing it with our own custom CSS

### v3.3.2 (legacy)

- feat: add option to display user-provided Loading component (useful if data has not been loaded)

### v3.2.2 (legacy)

- fix: first table entry was incorrect on page 2 and onwards
- fix: empty filename when downloading data
- feat: export only filtered entries instead of all data entries

### v3.2.1 (legacy)

- feat: makes it possible to access column data from user-provided custom components

### v3.1.1 (legacy)

- feat: add option for user-provided table footer component

### v3.0.1 (legacy)

- fix: user-provided custom components not rendered properly

### v3.0.0 (legacy)

- break: interface changes

### v2.3.4 (legacy)

- feat: add support for user-provided vue components
- feat: add support for user-provided sorting function for individual columns
- feat: add Language Service Provider to set global language settings
- fix: numeric data sorted as string not as numbers

### v2.2.3 (legacy)

- fix: custom file name for exported file not working

### v2.2.2 (legacy)

- feat: allows setting the positions of components (pagination, search input, etc) via CSS' grid
- fix: default per-page value not working

### v2.1.1 (legacy)

- feat: allows display of HTML via `unsafeHTML` option (false by default, feature requested by users of the plugin)
- fix: incorrect display of Action Buttons
- fix: column sorting not working

### v2.0.0 (legacy)

- break: remove vuex from deps
- break: interface changes
- css: overall improvements
- fix: crashes when sorting empty cells
- fix: crashes if user inputs out-of-range `go to page` value (keep it in range)

### v1.4.7 (legacy)

- fix: column not being sorted on first click

### v1.4.5 (legacy)

- feat: add option to select default sorting mode
- feat: add option to use HTML code in column title

### v1.3.4 (legacy)

- feat: add `columnKeys` option, a syntax sugar for defining columns

### v1.2.4 (legacy)

- feat: add button to export data to csv/xml/json/txt file

### v1.1.4 (legacy)

- css: overall improvements

### v1.1.2 (legacy)

- feat: add `go to page` button in pagination

### v1.0.1 (legacy)

- fix: remove unused code bundled with deployed code

### v1.0.0 (legacy)

- initial release
- feat: pagination
- feat: text searching
- feat: column sorting
- feat: display stats
- feat: empty table text
- feat: customizable text
- feat: lang support (en, es, pt-br)
