<template>
    <div class="data-table-wrapper" v-bind="tableWrapperAttributes">
        <table v-bind="tableAttributes">
            <thead>
                <tr>
                    <th v-for="(column, i) in columns" :key="i"
                        @click="$emit('sort', column)" v-bind="column.attributes">

                        <div>
                            {{ column.title }}
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
            </tbody>
        </table>
    </div>
</template>


<script src="./DataTableWrapper.js"></script>
<style src="./DataTableWrapper.scss" lang="scss"></style>
