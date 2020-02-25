<template>
    <div class="data-table-wrapper" v-bind="tableWrapper">
        <table v-bind="table">
            <data-table-thead />
            <data-table-tbody />
        </table>
    </div>
</template>


<script src="./DataTableWrapper.js"></script>
<style src="./DataTableWrapper.scss" lang="scss"></style>
