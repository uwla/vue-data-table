<template>
    <tr>
        <td v-for="(column, j) in columns" :key="('td' + j)">
            {{ data[column.key] }}
        </td>

        <td v-for="(item, index) in actionItems"
            :key="('td-action' + index)"
            class="data-table-action-td">
            <component
                :is="item.component"
                v-bind="{ data, action: item.action }"
            />
        </td>

        <td v-if="(actionColumn === true)"
            class="data-table-action-td">
            <component
                :is="item.component"
                v-for="(item, index) in actionComponents"
                v-bind="{ data, action: item.action }"
                :key="('td-action' + index)"
            />
        </td>
    </tr>
</template>

<script src="./TableRow.js"></script>
<style lang="scss">
.data-table-action-td {
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
}
</style>
