<template>
    <div class="data-table-wrapper" v-bind="tableWrapper">
        <table v-bind="table">
            <data-table-thead />
            <data-table-tbody />
        </table>
    </div>
</template>


<script src="./TableWrapper.js"></script>
<style src="./TableWrapper.scss" lang="scss"></style>
