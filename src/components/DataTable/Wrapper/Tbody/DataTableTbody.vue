<template>
    <tbody>
        <data-table-tr v-for="(row, i) in data" :key="i" :data="row" />

        <tr v-if="isEmpty">
            <td :colspan="columns.length" style="text-align: center">
                {{ emptyTableText }}
            </td>
        </tr>
    </tbody>
</template>

<script src="./DataTableTbody.js"></script>
