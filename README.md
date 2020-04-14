# VUE DATA TABLE

VueDataTable is a VueJS plug-in that adds advanced features to an HTML table. It was inspired by [DataTable jQuery Plugin](https://datatables.net/), but it uses `Vue`, not `jQuery`.

## Table of contents

1. [Features](#features)
2. [Demo](#demo)
3. [Getting started](#get-started)
    - [Installation](#installation)
    - [Set Up](#set-up)
    - [Use](#use)
4. [Customize configuration](#get-started)
    - [Columns](#columns)
    - [Lang](#lang)
    - [Action Buttons](#action-buttons)
    - [Sorting Components](#sorting-components)
5. [License](#license)
6. [Versioning](#versioning)
7. [Contributing](#contributing)
8. [Authors](#authors)
9. [Built-with](#built-with)

## Features

- Multiple Column Sorting
- Action Buttons Column
- Pagination
- Search Filter
- Export button (export data to XLS, JSON, CVS, and TXT)

## Demo

The best way to see if a package suits your needs is by viewing and editing a demo project. Here are some codeplayground in which you can test VueDataTable.

- [Demo01](https://codesandbox.io/s/vue-data-table-demo01-ygnl5?fontsize=14&hidenavigation=1&theme=dark)
- [Demo02](https://codesandbox.io/s/vue-data-table-demo02-r94qe?fontsize=14&hidenavigation=1&theme=dark)

## Get started

### Installation

```shell
npm install --save @andresouzaabreu/vue-data-table
```

### Set up

Add these lines to main.js

```javascript
import Vue from 'vue'
import store from 'path/to/your/store.js'
import installer from '@andresouzaabreu/vue-data-table'

installer(Vue, store)
```

This will register VueDataTable as a global Vue component and will add VueDataTable's module to our store since VueDataTable uses Vuex to manage data.

Besides bootstrap, VueDataTable uses its own css to style the table. Add these lines below to main.js to import the stylesheets.

```javascript
import 'bootstrap/dist/css/bootstrap.min.css'
import '@andresouzaabreu/vue-data-table/dist/DataTable.css'
```

### Use

```vue
<template>
    <div>
        <data-table v-bind="options"/>
    </div>
</template>

<script>
export default {
    computed: {
        options() {
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

**Note** Notice that v-bind will take all key-value pairs in the object (in this case, the `options`), and pass them as props to the VueDataTable. So it's a shortcut to pass multiple props at once.

## Customize configuration

| prop | type | default | description |
| --- | --- | --- | --- |
| data | `Array` | - | An array of objects with the data to be displayed in the table |
| columns | `Array` | - | An array of objects that specifies how to render each column. Not required if `columnKeys` is presented. |
| columnKeys | `Array` | - | An array of strings corresponding to the keys of each object in `data`. This will be discarded if `columns` is present. |
| lang | `String` | `en` | The default language |
| entriesLengths | `Array` | [10, 25, 50, 100] | The options for the number of rows being displayed per page |
| defaultEntryLength | `Number` | 10 | The default entry length in the `EntriesLength` component. If not specified and if `entriesLength` is specified, then `defaultEntryLength` will be the first value of the `entriesLength` |
| showEntriesLength | `Bool` | `true` | Wheter to show the `EntriesLength` component |
| showEntriesInfo | `Bool` | `true` | Wheter to show the EntriesInfo component |
| showSearchFilter | `Bool` | `true` | Wheter to show the SearchFilter component |
| showPagination | `Bool` | `true` | Wheter to show the Pagination component |
| showExportButton | `Bool` | `true` | Wheter to show the Export Button component |
| tableClass | `String` | `table table-striped table-hover` | The css classes of the table |
| tableWrapper | `String` | `data-table-wrapper` | The css classes of the table's wrapper |
| actionColumn | `Bool`, `String` | `false` | Whether to show the column with action buttons. Possible values are  `false` (no column), `true` (one column for all action buttons), and `'multiple'` (one column for each action button).
| actions | `Array` | `["view", "edit", "delete"]` | The actions for the action buttons. We can ommit some actions or add our own actions |
| actionButtons | `Object` | `DataTableActionButtons` | The Vue components to be displayed for each action button. |
| sortingMode | `String` | `multiple` | `multiple` enables multiple-column sorting. `single` enables single-column sorting. |
| sortIndexComponent | `Object` | `DataTableSortIndex` | The Vue component to be rendered as the sort index for orderable columns |
| sortIconComponent | `Object` | `DataTableSortIcon` | The Vue component to be rendered as the sort icon for orderable columns |
| allowedExports | `Array` | `["xls", "csv", "json", "txt"]` | The options the user can export the data to. Only four export types are available. |

### Columns

| key | type | default | description |
| --- | --- | --- | --- |
| key | `String` | - | The key of the objects in the `data` prop. The value of the matching key will be displayed in a table cell |
| title | `String` | `titleCase(key)` | The title to be displayed in the `th` element. If not specified, it will capitalize the `key` and then remove its dashes and underscores |
| orderable | `Bool` | `true` | Whether to allow sorting the column. It will use the `key` to sort the objects in the `data` |
| searchable | `Bool` | `true` | Whether to allow filtering the objects in `data` by matching the `search` text in the object's `key` |

If `columns` is not defined, then `columnKeys` must be defined and it will be mapped to a `columns` array with the default parameters. Example:

```javascript
// we can define the columns
{
    data: [/**/],
    columns: [
        {
            key: 'name',
        },
        {
            key: 'email',
            title: 'Email Address',
            orderable: false,
        },
        {
            key: 'phone',
            searchable: false,
        }
    ]
}

// or use columnKeys shortcut
{
    data: [/**/],
    columnKeys: ['name', 'email', 'registered_at']
},

// which will take the default values and map the array into this
[
    {
        key: 'name',
        title: 'Name',
        orderable: true,
        searchable: true,
    },
    {
        key: 'email',
        title: 'Email',
        orderable: true,
        searchable: true
    },
    {
        key: 'registered_at',
        title: 'Registered at',
        orderable: true,
        searchable: true
    }
]
```

### Text

Currently, VueDataTable has support for three languages: English (en), Brazilian Portuguese (pt-br), and Spanish(es). The `lang` in the `parameteres` specifies in which language to display the text in our table.

If we want to add a custom text (maybe because there is no language support or because we want a customized text), we have to set it in the `text` prop.

The following table shows the texts we can customize and their default values for the English language. All of the options must be type `String`, except the `actionColumnsText`, which is type `Object` and specifies the title of each action column (but only if we enable action buttons).

| key | default |
| --- | --- |
| entriesLengthText | "Show :entries entries" |
| infoText | "Showing :first to :last of :total entries" |
| infoTextFiltered | "Showing :first to :last of :filtered (filtered from :total entries)" |
| nextButtonText | "Next" |
| previousButtonText | "Previous" |
| paginationSearchText | "Go to page" |
| paginationSearchButtonText | "GO" |
| searchText | "search:" |
| downloadText | "export as:" |
| downloadButtonText | "DOWNLOAD" |
| emptyTableText | "No matching records found" |
| actionColumnText | "Actions" |
| actionColumnsText | {view: "View", edit: "Edit", delete: "Delete"} |

**Note**: Notice that the items `:first`, `:last`, `:total`, and `filtered` will be automatically replaced with their correspondent numbers.

Example code:

```javascript
options: {
    text: {
        entriesLengthText: "Number of users per page :entries",
        infoText: "Displaying :first to :last of :total users",
        emptyTableText: "No users found :(",
    }
}
```

### Action buttons

We provide three components for the actions `view`, `edit`, and `delete`. They use fontawesome and bootstrap.

#### Default action buttons

By default, VUeDataTable will show the following components for each action

```html
<!-- view button -->
<button class="btn btn-outline-success">
    <i class="fa fa-eye"></i>
</button>

<!-- edit button -->
<button class="btn btn-outline-primary">
    <i class="fa fa-edit"></i>
</button>

<!-- delete button -->
<button class="btn btn-outline-dark">
    <i class="fa fa-trash"></i>
</button>
```

#### Change the default components

To change the default components, we have to pass them to the `actionButtons` prop.

```javascript
import ViewButton from './components/ViewBUtton.vue'
import EditButton from './components/EditButton.vue'
import DeleteButton from './components/DeleteButton.vue'

export default {
    computed: {
        options() {
            return {
                actionButtons: {
                    view: ViewButton,
                    edit: EditButton,
                    delete: DeleteButton
                },
            }
        }
    }
}
```

**Note**: in the example above, we omitted some lines of code to keep it clean.

#### Add custom actions

For each action in the `actions` prop, there must be a vue component associated with that action. If we want to add actions (maybe a "clone" action or "download" action), we must specify a component.

In the following example, we have a `VideosDashboard` component that uses `VueDataTable`. We have added a `download` action (that download the video) and a `copy` action (which copy the video's url) as follows:

```javascript
import DownloadButton from './components/DownloadButton.vue'
import CopyTextButton from './components/CopyTextButton.vue'

export default {
    name: "VideosDashboard"
    computed: {
        options() {
            return {
                actions: ["copy", "download"],
                actionButtons: {
                    download:  DownloadButton,
                    copy: CopyTextButton,
                },
            }
        }
    }
}
```

**Note**: in the example above, we omitted some lines of code to keep it clean.

#### Triggering events

Now that we've learned how to register our custom action buttons, we need to perform some action when we click in those buttons.

By default, when we click in one of DataTableActionButtons, it will trigger an event. The name of the event will be the name of the action followed by "Data" (e.g, view => viewData, edit => editData, delete => deleteData). We use a global Vue instance called `DataTableEventBus` to be able to access the event from anywhere in our application.

In the following example, the `data` object passed in the event is equal to the `user`.

```javascript
export default {
    name: "UsersDashboard",

    created() {
        DataTableEventBus.$on("viewData", data => this.viewUser(data))
        DataTableEventBus.$on("editData", data => this.editUser(data))
        DataTableEventBus.$on("deleteData", data => this.deleteUser(data))
    },

    methods: {
        editUser(user) {
            // do something here
        },
        viewUser(user) {
            // do something here
        },
        deleteUser(user) {
            // do something here
        },
    }
}
```

If we add custom actions, the idea is the same. However, we need to register our custom action button.

```javascript
import DownloadButton from './components/DownloadButton.vue'

export default {
    name: "VideosDashboard",

    created() {
        DataTableEventBus.$on("downloadData", data => this.downloadVideo(data))
    },

    methods: {
        downloadVideo(video) {
            // do something here
        },
    },

    computed: {
        options() {
            return {
                actions: ["download"],
                actionButtons: {
                    download: DownloadButton,
                }
            }
        }
    }
}
```

Then, in our component (in this case `DownloadButton.vue`), we need to add a click event to our button and also we need to have a `data` property. Inside the click event, we must tell `DataTableEventBus` to emit an event. The first parameters is the event name, and the second parameter is the argument is the data object that matches the row of the button clicked. `VueDataTable` will pass the data (in this case, a `video` object) to our `actionButton` component, so we don't have to worry about that.

```vue
<template>
    <button class="download-button" @click="download">Download</button>
</template>

<script>
export const DownloadButton = {
    methods: {
        download() {
            DataTableEventBus.$emit("downloadData", this.data)
        }
    },

    props: {
        data: {
            type: Object,
            required: true
        },
    }
};
</script>
```

**Note**: We can give any name to the event emitted by `DataTableEventBus`. We just have to remember to update this name in all places that we are using it.

### Sorting components

#### Sorting icon

By default, VueDataTable will display arrows to indicate the sorting direction when sorting a column. The `SortingIcon` component is wrapped in a `th` element. The `th` element has a `data-sorting` attribute that may be `asc` or `desc` only. Based on this value, we display an `arrow_up` or an `arrow_down` icon using `CSS` rules.

```vue
<template>
    <span class="data-table-sort-icon">&nbsp;</span>
</template>

<style lang="scss">
.data-table-sort-icon {
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

**Note**: Some styles were omitted.

If we want to add our custom icon for this, then we need to register our component.

```javascript
import SortIcon from './components/SortIcon.vue'

export default {
    name: "VideosDashboard"
    computed: {
        options() {
            return {
                sortIconComponent: SortIcon,
            }
        }
    }
}
```

#### Sorting Index Icon

When sorting multiple columns, VueDataTable will display an icon with a index indicating which column had priority in the sorting process.

```vue
<template>
    <span class="data-table-sort-index">
        {{ index }}
    </span>
</template>
```

If we want to add our own component for this, we have to register it just like we did with the `sortIcon`.

```javascript
import SortIndex from './components/SortIndex.vue'

export default {
    name: "VideosDashboard"
    computed: {
        options() {
            return {
                sortIndexComponent: SortIndex,
            }
        }
    }
}
```

In our `SortIndex` component, we must have a `index` property, which correspondent to the index of the column in the sorting process.

```javascript
export default {
    name: "SortIndex",
    props: {
        index: {
            type: Number,
            required: true
        }
    }
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/AndreSouzaAbreu/vue-data-table/tags).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **André Souza Abreu** - *Initial work* - [Github](https://github.com/AndreSouzaAbreu)

See also the list of [contributors](https://github.com/AndreSouzaAbreu/vue-data-table/contributors) who participated in this project.

## Built With

- [vue](https://vuejs.org) - The web framework used
- [vuex](https://vuex.vuejs.org) - State Management library
- [bootstrap](https://getbootstrap.com/) - Front-end style library
- [fontawesome](https://fontawesome.com/) - Icon toolkit library
