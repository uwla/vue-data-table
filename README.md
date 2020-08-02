# VUE DATA TABLE

VueDataTable is a VueJS plug-in that adds advanced features to an HTML table. It was inspired by [DataTable jQuery Plugin](https://datatables.net/), but it was written from scratch using Vue.

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
- Pagination
- Search Filter
- Export data (XLS, JSON, CVS, or TXT)
- Action Buttons Column
- Custom Text

## Demo

The best way to see if a package suits your needs is by viewing and editing a demo project. Here are some code playgrounds in which you can test VueDataTable.

- [Demo 1 (preview)](https://ygnl5.csb.app/)
- [Demo 1 (preview and code)](https://codesandbox.io/s/vue-data-table-demo01-ygnl5)
- [Demo 2 (preview)](https://r94qe.csb.app/)
- [Demo 2 (preview and code)](https://codesandbox.io/s/vue-data-table-demo02-r94qe)

## Get started

### Installation

```shell
npm install --save @andresouzaabreu/vue-data-table
```

### Set up

```javascript
import DataTable from '@andresouzaabreu/vue-data-table'
Vue.component("data-table", DataTable)
```

Don't forget to add the stylesheets

```javascript
import 'bootstrap/dist/css/bootstrap.min.css'
import '@andresouzaabreu/vue-data-table/dist/DataTable.css'
```

### Use

```vue
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

**Note** Notice that v-bind will take all key-value pairs in the object (in this case, the `bindings`), and pass them as props to the VueDataTable. So, this is a shortcut to pass multiple props at once.

## Customize configuration

| prop | type | default | description |
| --- | --- | --- | --- |
| data | `Array` | - | An array of objects with the data to be displayed in the table |
| columns | `Array` | - | An array of objects that specifies how to render each column. Not required if `columnKeys` is presented. |
| columnKeys | `Array` | - | An array of strings corresponding to the keys of each object in `data`. This will be discarded if `columns` is present. |
| lang | `String` | `en` | The default language |
| perPageSizes | `Array` | [10, 25, 50, 100] | The options for the number of rows being displayed per page |
| defaultPerPage | `Number` | 10 | The default entry length in the `EntriesLength` component. If not specified and if `entriesLength` is specified, then `defaultEntryLength` will be the first value of the `entriesLength` |
| showPerPage | `Bool` | `true` | Whether to show the `EntriesLength` component |
| showEntriesInfo | `Bool` | `true` | Whether to show the EntriesInfo component |
| showSearchFilter | `Bool` | `true` | Whether to show the SearchFilter component |
| showPagination | `Bool` | `true` | Whether to show the Pagination component |
| showDownloadButton | `Bool` | `true` | Whether to show the button to download the table's data |
| tableClass | `String` | `table table-striped table-hover` | The css classes of the table |
| tableWrapper | `String` | `data-table-wrapper` | The css classes of the table's wrapper |
| actionMode | `String` | `disabled` | How to show action columns. Possible values are `disabled`, `multiple` (one column for each action), and `single` (one column with all actions).
| actions | `Array` | `["view", "edit", "delete"]` | The actions for the action buttons. We can ommit some actions or add our own actions |
| actionComponents | `Object` | `DataTableActionButtons` | The Vue components to be displayed for each action button. |
| sortingMode | `String` | `multiple` | `multiple` enables multiple-column sorting. `single` enables single-column sorting. |
| sortingIndexComponent | `Object` | `DataTableSortingIndex` | The Vue component to be rendered as the sort index for sortable columns |
| sortingIconComponent | `Object` | `DataTableSortingIcon` | The Vue component to be rendered as the sort icon for sortable columns |
| allowedExports | `Array` | `["xls", "csv", "json", "txt"]` | The options the user can export the data to. Only four export types are available. |

### Columns

| key | type | default | description |
| --- | --- | --- | --- |
| key | `String` | - | The key of the objects in the `data` prop. The value of the matching key will be displayed in a table cell |
| title | `String` | `titleCase(key)` | The title to be displayed in the `th` element. If not specified, it will capitalize the `key` and then remove its dashes and underscores |
| sortable | `Bool` | `true` | Whether to allow sorting the column. It will use the `key` to sort the objects in the `data` |
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
            sortable: false,
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
        sortable: true,
        searchable: true,
    },
    {
        key: 'email',
        title: 'Email',
        sortable: true,
        searchable: true
    },
    {
        key: 'registered_at',
        title: 'Registered at',
        sortable: true,
        searchable: true
    }
]
```

### Text

Currently, VueDataTable has support for three languages: English (en), Brazilian Portuguese (pt-br), and Spanish(es). The `lang` prop specifies in which language to display the text in our table.

If we want to add a custom text (maybe because there is no language support or because we want something else), we have to set it in the `text` prop.

The following table shows the texts we can customize and their default values for the English language. All of the options must be a `String`, except the `actionsText`, which must be an `Object` and it specifies the title of each action column (but only if we enable action columns).

| key | default |
| --- | --- |
| perPageText | "Show :entries entries" |
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
| actionsText |  `{view: "View", edit: "Edit", delete: "Delete", "*": "Actions"}` |

**Note**: Notice that the placeholders `:first`, `:last`, `:total`, and `filtered` will be automatically replaced with the proper numbers.

Example code:

```javascript
parameters() {
    return {
        data: [/**/],
        columns: [/**/],
        text: {
            entriesLengthText: "Number of users per page :entries",
            infoText: "Displaying :first to :last of :total users",
            emptyTableText: "No users found :(",
        }
    }
}
```

### Action Components

We provide three components for the actions `view`, `edit`, and `delete`. They use fontawesome and bootstrap.

#### Default Action Components

By default, VUeDataTable will show the following components for each action

```html
<!-- view component -->
<button class="btn btn-outline-success">
    <i class="fa fa-eye"></i>
</button>

<!-- edit component -->
<button class="btn btn-outline-primary">
    <i class="fa fa-edit"></i>
</button>

<!-- delete component -->
<button class="btn btn-outline-dark">
    <i class="fa fa-trash"></i>
</button>
```

#### Change the default components

To change the default components, we have to pass them to the `actionButtons` prop.

```javascript
import CustomViewComponent from './path/to/CustomViewComponent.vue'
import CustomEditComponent from './path/to/CustomEditComponent.vue'
import CustomDeleteComponent from './path/to/CustomDeleteComponent.vue'

export default {
    computed: {
        options() {
            return {
                actionComponents: {
                    view: CustomViewComponent,
                    edit: CustomEditComponent,
                    delete: CustomDeleteComponent
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
import DownloadButton from './path/to/DownloadButton.vue'
import CopyTextButton from './path/to/CopyTextButton.vue'

export default {
    name: "VideosDashboard"
    computed: {
        options() {
            return {
                actions: ["copy", "download"],
                actionComponents: {
                    download:  DownloadButton,
                    copy: CopyTextButton,
                },
                actionsText: {
                    "download": "Download now",
                    "copy": "Copy url",
                }
            }
        }
    }
}
```

**Note**: in the example above, we omitted some code to keep it clean.

#### Triggering events

Now that we've learned how to register our custom action components, we need to perform some action when we click in those buttons.

By default, when we click in one of DataTableActionButtons, it will trigger an event. The name of the event will be the name of the action followed by "Data" (e.g, view => viewData, edit => editData, delete => deleteData). We use a global Vue instance called `DataTableEventBus` to be able to access the event from anywhere in our application.

In the following example, the `data` object passed in the event is equal to the `user`.

```vue
<template>
    <div>
        <data-table v-bind="bindings" @actionTriggered="handleAction">
    </div>
</template>
<script>
export default {
    name: "UsersDashboard",

    methods: {
        handleAction(actionName, data) {
            switch(actionName) {
                case "edit":
                    this.editUser(data);
                    break;
                case "view":
                    this.viewUser(data);
                    break;
                case "delete":
                    this.deleteUser(data);
            }
        },
        editUser(user) {
            // do stuff
        },
        viewUser(user) {
            // do stuff
        },
        deleteUser(user) {
            // do stuff
        },
    }
}
</script>
```

If we add custom actions, the idea is the same.

```vue
<template>
    <div>
        <data-table v-bind="bindings" @actionTriggered="handleAction">
    </div>
</template>

<script>
import DownloadButton from './path/to/DownloadButton.vue'

export default {
    name: "VideosDashboard",

    methods: {
        handleAction(actionName, data) {
            switch(actionName) {
                case "download":
                    this.downloadVideo(data);
                    break;
                /* other stuff */
            }
        },
        downloadVideo(video) {
            // do stuff
        },
    },

    computed: {
        bindings() {
            return {
                data: [],
                actions: ["download"]
                actionText: {"download": "Download now"},
                actionComponents: {
                    "download": DownloadButton
                }
            }
        }
    }
}
</script>
```

Then, in our component (in this case, `DownloadButton.vue`), we need to add a click event which emits an event. The payload of the event has two parameters: the first parameters is the name of the action, and the second parameter is the data object that matches the given row. `VueDataTable` will pass the data to the our `actionComponent` component, so we don't have to worry about getting the data ourselves.

```vue
<template>
    <button class="download-btn" @click="download">Download it now!</button>
</template>

<script>
export const DownloadButton = {
    methods: {
        download() {
            this.$emit("download", this.data)
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

**Note**: We can give any name to the event. We just have to remember to update this name in all places that we are using it.

### Sorting components

#### Sorting icon

By default, VueDataTable will display arrows to indicate the sorting direction when sorting a column. The `SortingIcon` component is wrapped in a `th` element. The `th` element has a `data-sorting` attribute that may be `asc` or `desc` only. Based on this value, we display an `arrow_up` or an `arrow_down` icon using `CSS` rules.

```vue
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

If we want to add our custom icons for this, then we can register our component.

```javascript
import SortingIcon from './path/to/SortIcon.vue'

export default {
    computed: {
        bindings() {
            return {
                SortingIconComponent: SortingIcon,
                data: [],
                /**/
            }
        }
    }
}
```

#### Sorting Index Icon

When sorting multiple columns, VueDataTable will display an icon with a index indicating which column has the priority in the sorting process.

```vue
<template>
    <span class="data-table-sort-index">
        {{ index }}
    </span>
</template>
```

If we want to add our own component for this, we can register it just like we did before.

```javascript
import SortingIndex from './path/to/SortingIndex.vue'

export default {
    computed: {
        bindings() {
            return {
                SortingIndexComponent: SortingIndex,
                data: [],
                /**/
            }
        }
    }
}
```

In our `SortingIndex` component, we must have a `index` property, which correspondent to the index of the column in the sorting process.

```javascript
export default {
    name: "SortingIndex",
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

## Author

- **André Souza Abreu** - [Github](https://github.com/AndreSouzaAbreu)

See also the list of [contributors](https://github.com/AndreSouzaAbreu/vue-data-table/contributors) who participated in this project.
