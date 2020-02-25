<template>
    <tr>
        <td v-for="(column, j) in columns" :key="('td' + j)">
            {{ data[column.key] }}
        </td>

        <td class="data-table-action-td" v-for="(item, i) in actionItems" :key="('td-action' + i)">
            <component :is="item"/>
        </td>

        <td class="data-table-action-td" v-if="actionColumn === true">
            <component :is="item" v-for="(item, i) in actionComponents" :key="('td-action' + i)" />
        </td>
    </tr>
</template>

<script src="./DataTableTr.js"></script>
