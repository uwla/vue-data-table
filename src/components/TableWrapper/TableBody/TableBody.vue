<template>
    <tbody>
        <data-table-tr v-for="(row, index) in data" :key="index" :data="row" />

        <tr v-if="isEmpty">
            <td :colspan="numberOfColumns" style="text-align: center">
                {{ emptyTableText }}
            </td>
        </tr>
    </tbody>
</template>

<script src="./TableBody.js"></script>
