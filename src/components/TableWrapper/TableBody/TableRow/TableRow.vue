<template>
    <tr>
        <td v-for="(column, j) in columns" :key="('td' + j)">
            {{ data[column.key] }}
        </td>

        <td class="data-table-action-td" v-for="(item, i) in actionItems" :key="('td-action' + i)">
            <component :is="item.component" v-bind="{data, action: item.action}" />
        </td>

        <td class="data-table-action-td" v-if="actionColumn === true">
            <component :is="item.component" v-bind="{data, action: item.action}"
                v-for="(item, i) in actionComponents" :key="('td-action' + i)" />
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
