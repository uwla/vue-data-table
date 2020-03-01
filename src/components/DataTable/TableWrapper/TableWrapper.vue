<template>
    <div class="data-table-wrapper" v-bind="tableWrapper">
        <table v-bind="table">
            <data-table-thead />
            <data-table-tbody />
        </table>
    </div>
</template>

<script src="./TableWrapper.js"></script>

<style lang="css">
.data-table-wrapper table {
    margin: 0;
}
</style>
