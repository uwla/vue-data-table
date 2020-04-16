<template>
    <div :class="tableWrapperClass">
        <table :class="tableClass">
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

.data-table-wrapper {
    overflow: auto;
    height: 80vh;
    width: 100%;
}
</style>
