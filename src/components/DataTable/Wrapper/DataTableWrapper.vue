<template>
    <div class="data-table-wrapper" v-bind="tableWrapper">
        <table v-bind="table">
            <thead>
                <tr>
                    <th v-for="(column, i) in columns" :key="i"
                        @click="sortColumn(column)" v-bind="column.attributes">

                        <div class="data-table-thead-content">
                            <span class="data-table-column-title">
                                {{ column.title }}
                            </span>

                            <span class="data-table-sorting-index" v-if="column.sortIndex != null">
                                {{ column.sortIndex + 1}}
                            </span>

                            <span class="data-table-sorting-icon" v-if="column.orderable">
                                &nbsp;
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody>

                <tr v-for="(row, i) in data" :key="i">
                    <td v-for="(prop, j) in columns" :key="j">
                        {{ row[prop.data] }}
                    </td>
                </tr>

                <tr v-if="isEmpty">
                    <td :colspan="columns.length" style="text-align: center"    >
                        {{ emptyTableText }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script src="./DataTableWrapper.js"></script>
<style src="./DataTableWrapper.scss" lang="scss"></style>
