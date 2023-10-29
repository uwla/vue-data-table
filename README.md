# VUE DATA TABLE

`VueDataTable` is a Vue3 plugin that adds advanced features to an HTML table.

It was inspired by DataTable jQuery Plugin, but was written from scratch in Vue.

## TABLE OF CONTENTS

1. [Features](#features)
2. [Demo](#demo)
3. [Getting started](#getting-started)
    - [Installation](#installation)
    - [Set Up](#set-up)
    - [Usage](#usage)
4. [Configuration](#configuration)
    - [Columns](#columns)
    - [Text](#text)
    - [Layout](#layout)
    - [Custom components](#custom-components)
5. [Roadmap](#roadmap)
6. [License](#license)
7. [Contributing](#contributing)

## FEATURES

- Pagination
- Search filter
- Single column sorting
- Multiple column sorting
- Customize every visible text
- Support for multiple languages
- Export data (JSON, CVS, TXT or XLS)
- Acton buttons (view, edit, delete)
- Editable cells (edit cell values)
- Custom Vue Components to render cells
- Custom Footer to display data summary

## DEMO

The best way to see if a package suits your needs is by viewing  and  editing  a
demo project. Here is a code playground in which you can test `VueDataTable`:

- [Demo (preview)](https://vtlyhz.csb.app/)
- [Demo (preview and code)](https://codesandbox.io/s/vue-data-table-demo-vtlyhz)

## GETTING STARTED

### Installation

```shell
npm install @uwlajs/vue-data-table
```

### Set up

```javascript
import VueDataTable from "@uwlajs/vue-data-table";
Vue.component("vue-data-table", VueDataTable);
```

Don"t forget to add the style sheets

```javascript
import "@uwlajs/vue-data-table/dist/VueDataTable.css";
```

### Usage

```html
<template>
    <div>
        <data-table v-bind="bindings"/>
    </div>
</template>
<script>
export default {
    computed: {
        bindings() {
            return {
                columns: [/*the columns*/]
                data: [/*the data*/]
                /* other props...*/
            }
        }
    },
}
</script>
```

**Note** Notice that v-bind will take all key-value pairs in the object (in this
case, the `bindings`), and pass them as props to the `VueDataTable.` So, this is
a shortcut to pass multiple props at once.

## CONFIGURATION

Only `data` e `columns` are required. Other props are optional.

| prop                  | type     | default                           | description                                                                                |
| --------------------- | -------- | --------------------------------- | ------------------------------------------------------------------------------------------ |
| data                  | `Array`  | -                                 | Array of objects with the data to be displayed on the table                                |
| columns               | `Array`  | -                                 | Array of objects that specifies how to render each column. Optional if `columnKeys` is set |
| columnKeys            | `Array`  | -                                 | Array of strings matching the object keys in `data`. This is discarded if `columns` is set |
| lang                  | `String` | `en`                              | The default language                                                                       |
| perPageSizes          | `Array`  | [10, 25, 50, 100]                 | The options for the number of rows being displayed per page                                |
| defaultPerPage        | `Number` | 10                                | The default number of entries. If unset, then it will be the first value of `perPageSizes` |
| isLoading             | `Bool`   | `false`                           | Whether table data is loading. Table rows are shown only if this value is set to `false`   |
| loadingComponent      | `Object` | -                                 | VueJS component to be shown if `isLoading` is set to `true`                                |
| showPerPage           | `Bool`   | `true`                            | Whether to show the `PerPage` component                                                    |
| showEntriesInfo       | `Bool`   | `true`                            | Whether to show the `EntriesInfo` component                                                |
| showSearchFilter      | `Bool`   | `true`                            | Whether to show the `SearchFilter` component                                               |
| showPagination        | `Bool`   | `true`                            | Whether to show the `Pagination` component                                                 |
| showDownloadButton    | `Bool`   | `true`                            | Whether to show the button to download the table's data                                    |
| tableClass            | `String` | `table table-striped table-hover` | The table's HTML `class` attribute                                                         |
| sortingMode           | `String` | `multiple`                        | Whether to sort a single column or multiple columns at once                                |
| sortingIndexComponent | `Object` | `VdtSortingIndex`                 | VueJS component for the sorting index on sortable columns                                  |
| sortingIconComponent  | `Object` | `VdtSortingIcon`                  | VueJS component for the sorting icon on sortable columns                                   |
| footerComponent       | `Object` | `null`                            | VueJS component for custom table footer                                                    |
| allowedExports        | `Array`  | `["csv", "json", "txt"]`          | Formats the user can export the data to. Allowed values: `csv`, `json`, `txt`, `xlsx`      |

### Columns

| key             | type       | default          | description                                               |
| --------------- | ---------- | ---------------- | --------------------------------------------------------- |
| key             | `String`   | -                | The object field to be displayed in a table cell          |
| title           | `String`   | `titleCase(key)` | The title displayed in the header.                        |
| searchable      | `Bool`     | `true`           | Whether to allow searching rows by this column field      |
| sortable        | `Bool`     | `true`           | Whether to allow sorting the data by this column field    |
| editable        | `Bool`     | `true`           | Whether the column is editable by the user.               |
| type            | `String`   | `string`         | Data type of `key`. Allowed values: `string`, `number`    |
| compareFunction | `Function` | -                | Custom function provided by the user to sort the column   |
| searchFunction  | `Function` | -                | Custom function provided by the user to search the column |
| index           | `Number`   | 1000             | A lower shifts the column to the left of the table        |
| component       | `Object`   | -                | Custom Vue component to render inside table cell.         |
| componentProps  | `Object`   | -                | Props to passs to the custom component                    |

If `columns` is not defined, then `columnKeys` must be defined and  it  will  be
mapped to a `columns` array with the default parameters. Example:

```javascript
// we can define the columns
config = {
    data: users,
    columns: [
        {
            key: "name",
        },
        {
            key: "email",
            title: "Email Address",
            sortable: false,
        },
        {
            key: "phone",
            sortable: false,
            searchable: false,
            index: 1, // smaller indexes means the column is shift to the left
        },
        {
            key: "permissions",

            /* custom function sort users by which user has more permissions */
            compareFunction: function(a, b) {
                // permissions is an array
                return a.permissions.length - b.permissions.length;
            },

            /* custom function to allow searching the permission array */
            searchFunction: function(search, data) {
                return data.permissions.some(permission => permission.includes(search))
            },

            searchable: true,

            /* custom component to display the permissions */
            component: UserPermissionList,
        }
    ]
}

// or use columnKeys shortcut
config = {
    data: user,
    columnKeys: ["name", "email", "registered_at", "last_access_at"]
},

// which will take the default column and map the array into this
[
    {
        key: "name",
        title: "Name",
        sortable: true,
        searchable: true,
        index: 1000
    },
    {
        key: "email",
        title: "Email",
        sortable: true,
        searchable: true,
        index: 1000
    },
    {
        key: "registered_at",
        title: "Registered At",
        sortable: true,
        searchable: true,
        index: 1000
    },
    {
        key: "last_access_at",
        title: "Last Access At",
        sortable: true,
        searchable: true,
        index: 1000
    },
]
```

#### Custom cell component

Custom components must have a `data` property to receive the data of the current
row for the component to display it.

In the previous code snippet, we used our custom component `UserPermissionList`.
Below is a sample of that custom component.

```html
<template>
    <div>
        List of permissions for the user {{ data.name }} :
        <ul>
            <li v-for="(permission, i) in data.permissions" :key="i">
                {{ permission }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "UserPermissionList",
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
</script>
```

To handle events triggered by a custom component (such as clicking a button in a
component), the component should emit an event called `userEvent`  and  pass  an
arbitrary payload to it. The event will be propagated upwards by `VueDataTable`,
which will also emit an event called `userEvent` whose payload is  the  same  as
the one emitted by the custom component. For example:

```html
<template>
    <input type="checkbox" class="form-control" :checked="value" @change='toggleChecked' />
</template>
<script>
export {
    name: 'CheckboxCell',
    data() {
        return {
            value: false,
        }
    },
    methods: {
        toggleChecked() {
            const payload = {
                id: this.data.id,
                checked: this.value,
            }
            this.$emit('userEvent', payload)
        }
    },
    props: {
        data: Object,
    }
}
</script>
```

When the users clicks the checkbox, it will emit an `userEvent` event, which can
be accessed from the `VueDataTable`. Here is an  continuation  of  the  previous
example.

```html
<template>
    <div class="dashboard">
        <h1>DASHBOARD</h1>
        <button class="btn btn-danger">
            DELETE SELECTED ROWS
        </button>
        <vue-data-table
            :data="data"
            :columns="columns"
            @userEvent="handleEvent" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: [/**/],
            columns: [/**/],
            selectedRows: [],
        }
    },
    methods: {
        handleEvent(payload) {
            const { checked, id } = payload
            if (checked === true) {
                if (! this.selectedRows.includes(id))
                    this.selectedRows.push(id)
            } else {
                this.selectedRows = this.selectedRows.filter(rowId => rowId !== id)
            }
        },
        deleteRows() {
            this.data = this.data.filter(row => ! this.selectedRows.includes(row.id))
            this.selectedRows = []
        }
    }
}
</script>
```

In the code snippet above, when the user checks the  checkbox  rendered  by  the
custom component `CheckboxCell`, it will emit an event that is  handled  by  the
method `handleEvent`. This method will add/remove the `id` of  the  row  to/from
the `selectedRows` array. When the user clicks the "dangerous delete button", it
will deleted the selected rows from the table (on the client side only).

#### Action Buttons

`VueDataTable` provides a component called `VdtActionButtons`, which can be used
to display buttons for common CRUD action such as viewing, editing, deleting.

Here is an example with all buttons (view, edit, delete) in one column:

```html
<template>
    <main>
        <h1>DASHBOARD</h1>
        <vue-data-table v-bind="params" @userEvent="handleUserEvent"/>
    </main>
</template>
<script>
import { VdtActionButtons } from '@uwlajs/vue-data-table'
export default {
    data() {
        return {
            params: {
                data: users,
                columns: [
                    { key: 'name' },
                    { key: 'job' },
                    { component: VdtActionButtons, title: "actions" },
                ],
            },
        }
    },
    methods: {
        handleUserEvent(payload) {
            console.log(payload.action, payload.data.name)
        }
    }
}
</script>
```

Another example, this time one button per column:

```html
<template>
    <main>
        <h1>DASHBOARD</h1>
        <vue-data-table v-bind="params" @userEvent="handleUserEvent"/>
    </main>
</template>
<script>
import { VdtActionButtons } from '@uwlajs/vue-data-table'
export default {
    data() {
        return {
            params: {
                data: users,
                columns: [
                    { key: 'name' },
                    { key: 'job' },
                    {
                        title: "view"
                        component: VdtActionButtons,
                        componentProps: { actions: ["view"] },
                    },
                    {
                        title: "edit"
                        component: VdtActionButtons,
                        componentprops: { actions: ["edit"] },
                    },
                    {
                        title: "delete"
                        component: VdtActionButtons,
                        componentprops: { actions: ["delete"] },
                    },
                ],
            },
        }
    },
    methods: {
        handleUserEvent(payload) {
            console.log(payload.action, payload.data.name)
        }
    }
}
</script>
```

When an user click an action button, `VueDataTable` will  emit  an  event  whose
payload is an object with two fields: `action` and `data`. The `action`  is  the
name of the action (view, edit, delete) and `data` is the data of the row.

Check out the demo to see a real working example of using action buttons.

#### Editable cells

It is possible to make a column editable by settings `editable` to true in the
column definition.

```javascript
columns: {
    [ 'key': name, editable: true],
    [ 'key': email, editable: true],
    [ 'key': phone, editable: true],
    // ...
}
```

This will make `VueDataTable` display an `edit` button on the right side of  the
cell's text. When the user clicks the button, it will show an input, so the user
can enter a new value for the cell. The user can cancel the editing or  confirm.
If the user confirms editing,  `VueDataTable`  will  emit  a  `userEvent`  whose
payload looks like the following:

```javascript
{
    action: 'updateCell',
    key: '<key String>',
    data: '<data Object>',
    value: '<value String>',
}
```

Where `key` is the key of the column (if user edits the `name` column, the `key`
will be `name`), the `data` is the object of the row which was edit (an example:
`{ id: 100, name: 'joe', email: 'joe@email.test' }`), and `value` is  the  value
inserted by the user (such as `Joe Doe`).

It is up to the developer to handle the event to update the row by, for example,
sending an AJAX request to the API, then updating the `data` array on the client
side. Here is an example of how to update the data array on the client side:

```html
<template>
  <vue-data-table :data="data" :columns="columns" @userEvent="handleUserEvent"/>
</template>
<script>
export default {
    /* ... */

    methods: {
        handleUserEvent(payload) {
            if (payload.action === 'updateCell')
            {
                // send some ajax request
                // ...

                // then update the cell
                this.updateDataCell(payload.data, payload.key, payload.value)

            } else {
                // some other event
            }
        },
        updateDataCell(row, field, value) {
            let ind = this.data.findIndex(r => r.id === row.id)
            if (ind < 0) return
            let newRow = {... this.data[ind]}
            newRow[field] = value
            this.data.splice(ind, 1, newRow)
        },
    }
}
</script>
```

### Text

Currently, `VueDataTable` has support for the following languages: English (en),
Brazilian Portuguese (pt-br), and Spanish(es).  The  `lang`  prop  specifies  in
which language to display the text in our table.

If we want to add a custom text (maybe because there is no language  support  or
because we want something else), we have to set it in the `text` prop.

The following table shows the texts we can customize and  their  default  values
for the English language.

| key                        | default                                                               |
| ---                        | ---                                                                   |
| perPageText                | "Show :entries entries"                                               |
| infoText                   | "Showing :first to :last of :total entries"                           |
| infoFilteredText           | "Showing :first to :last of :filtered (filtered from :total entries)" |
| nextButtonText             | "Next"                                                                |
| previousButtonText         | "Previous"                                                            |
| paginationSearchText       | "Go to page"                                                          |
| paginationSearchButtonText | "GO"                                                                  |
| searchText                 | "search:"                                                             |
| downloadText               | "export as:"                                                          |
| downloadButtonText         | "DOWNLOAD"                                                            |
| emptyTableText             | "No matching records found"                                           |

**Note**:  Notice  that  the  placeholders  `:first`,  `:last`,  `:total`,   and
`filtered` will be automatically replaced with the proper numbers.

Example code:

```javascript
parameters() {
    return {
        data: [/**/],
        columns: [/**/],
        text: {
            PerPageText: "Number of users per page :entries",
            infoText: "Displaying :first to :last of :total users",
            emptyTableText: "No users found :(",
        }
    }
}
```

#### Adding global custom language

If your lang is not yet supported, you can add a new language and use it in  any
`VueDataTable` instance as follow:

```javascript
import { languageServiceProvider } from "@uwlajs/vue-data-table";
const loremIpsumLanguage = {
    perPageText: "lorem ppsum",
    nextButtonText: "labore nostrud",
    /* more ... */
};
languageServiceProvider.setLang("lorem", loremIpsumLanguage)

/**
 * @function setLang
 * @param {String} lang           the name of the language
 * @param {Object} translations   an object with the translated text
*/
```

You can also change any default text for an  existing  language  and  that  will
reflect the changes globally. For example:

```javascript
// the default text for the download button in the export component is "export as"
// we may want change that to "download as"
languageServiceProvider.setLangText("en", "downloadText", "download as:")

/**
 * @function setLangText
 * @param lang
 * @param {String} key     the key in the lang object
 * @param {String} text    the text will be display to the user
*/
```

### Layout

`VueDataTable` uses CSS's grid display to specify the position of its components
(search filter, pagination, entries info, per page options, download button).

**We can specify the position of the components by including our custom CSS/SCSS
and overriding the defaults.**

By default, this is how `VueDataTable` displays the components:

```scss
.data-table {
    display: grid;
    width: 100%;
    grid-template-columns: 25% 25% 25% 25%;
    &> div {
        margin-top: 1rem;
        max-width: 100%;
    }
    & > .data-table-search-filter, .data-table-pagination, .data-table-export-data {
        margin-left: auto
    }
    @media (min-width: 1401px) {
        grid-template-areas:
            "perPage search search search"
            "table table table table"
            "info pagination pagination download";
    }
    @media (min-width: 1051px) AND (max-width: 1400px) {
        grid-template-areas:
            "perPage search search search"
            "table table table table"
            "info pagination pagination pagination"
            ". . download download";
    }
    @media (min-width: 851px) AND (max-width: 1050px) {
        grid-template-areas:
            "perPage search search search"
            "table table table table"
            "pagination pagination pagination pagination"
            "info info download download";
    }
    @media (max-width: 800px) {
        & > .data-table-pagination {
            flex-wrap: wrap;
        }
    }
    @media (min-width: 651px) AND (max-width: 850px) {
        grid-template-areas:
            "perPage search search search"
            "table table table table"
            "pagination pagination pagination pagination"
            "info info info info"
            "download download download download";
    }
    @media (max-width: 650px) {
        grid-template-areas:
            "search search search search"
            "perPage perPage perPage perPage "
            "table table table table"
            "pagination pagination pagination pagination"
            "info info info info"
            "download download download download";
        & > .data-table-per-page {
            margin-left: auto
        }
    }
}
```

Feel free to copy the styles above, modify it, and then set the position of the
components as you want.

### Custom Components

Besides a custom component for each column, you provide  custom  components  for
the table's footer, the column's `sorting  icon`  (the  icon  displayed  if  the
columns is sorted), and the column's `sorting index` (the index of  the  current
column if it is being sorted and multi column sorting is enabled).

#### Footer

The property `footerComponent` sets the component to render the table's  footer.
The component can be either the component `Object`, or a `String` equals to  the
name of the registered component.

The `footerComponent` must be a `<tfoot>` HTML element  and  it  must  have  the
properties `data`, `dataDisplayed`, `dataFiltered`. If the  component  does  not
specify those properties in `props`, Vue  will  probably  think  they  are  some
custom HTML attribute and their values will be show as HTML attributes, which is
really messy.

The property `data`  correspond  to  all  data  passed  to  `VueDataTable`.  The
`dataDisplayed` corresponds to all data that is currently visible on the  table.
The `dataFiltered` corresponds to all data that was filtered by a search  query.
These properties can be used to perform common operations  such  as  calculating
the sum of the values of the total rows of a certain column.

Suppose we have a table that of fruits. The `data` is an array of objects  whose
properties are `name`, `price`, and `amount`. We can provide a custom footer  to
show the total amount of fruits bought and the total price.

The footer component would be something like:

```html
<template>
  <tfoot v-show="dataDisplayed.length > 0">
    <td>Total</td>
    <td></td>
    <td>{{ totalAmount }}</td>
    <td>{{ totalPrice }}</td>
  </tfoot>
</template>
<script>
export default {
  name: "TableFooter",
  computed: {
    totalPrice() {
      let s = 0;
      for (let f of this.dataDisplayed)
        s += f.price * f.amount;
      return s;
    },
    totalAmount() {
      let s = 0;
      for (let f of this.dataDisplayed)
        s += f.amount;
      return s;
    }
  },
  props: {
    data: Array,
    dataDisplayed: Array,
    dataFiltered: Array,
  }
}
</script>
```

And we pass this component as follow:

```html
<template>
    <data-table v-bind="tableProps"/>
</template>
<script>
import TableFooter from './TableFooter.vue'

export default {
    /* ... some code */
    data() {
        return {
            tableProps: {
                columns: [ /* ... code */ ],
                data: [ /* ... more code */ ],
                footerComponent: TableFooter,
            }
        }
    }
}
</script>
```

Alternately, you can register the component and pass a string:

```javascript
/* early on */
import TableFooter from './TableFooter.vue'
Vue.component("table-footer", TableFooter)

/* later on */
    footerComponent: "table-footer"
```

#### Sorting icon

By default, `VueDataTable` will display arrows to indicate the sorting direction
when sorting a column. The `SortingIcon` component is wrapped in a `th` element.
The `th` element has a `data-sorting` attribute that  may  be  `asc`  or  `desc`
only. Based on this value, we display an  `arrow_up`  or  an  `arrow_down`  icon
using `CSS` rules.

```html
<template>
    <span class="data-table-sorting-icon">&nbsp;</span>
</template>
<style lang="scss" scoped>
.data-table-sorting-icon {
    &::after {
        content: "\2193";
    }
    &::before {
        content: "\2191";
    }
    &::after, &::before {
        opacity: 0.5;
    }
    [data-sorting="asc"] &::before, [data-sorting="desc"] &::after {
        opacity: 1;
    }
}
</style>
```

**Note**: Some code was omitted to keep it clean.

If we want to add our custom icons for this, then we can register our component,
like so:

```javascript
import SortingIcon from "./path/to/SortIcon.vue";

export default {
    computed: {
        bindings() {
            return {
                SortingIconComponent: SortingIcon,
                data: [],
                /**/
            };
        }
    }
}
```

#### Sorting Index Icon

When sorting multiple columns, `VueDataTable` will display an icon  with a index
indicating which column has the priority in the sorting process.

```html
<template>
    <span class="data-table-sort-index">
        {{ index }}
    </span>
</template>
```

If we want to add our own component for this, we can register it  just  like  we
did before.

```javascript
import SortingIndex from "./path/to/SortingIndex.vue";

export default {
    computed: {
        bindings() {
            return {
                SortingIndexComponent: SortingIndex,
                data: [],
                /**/
            };
        }
    }
};
```

In our  `SortingIndex`  component,  we  must  have  a  `index`  property,  which
correspondent to the index of the column in the sorting process.

```javascript
export default {
    name: "SortingIndex",
    props: {
        index: {
            type: Number,
            required: true
        }
    }
};
```

## ROADMAP

- Support for Vue3
- String notation for defining columns

## LICENSE

MIT

## CONTRIBUTING

Pull requests are very welcome.