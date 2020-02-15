<template>
    <div class="data-table">
        <!-- <div>
            <data-table-entries-length v-if="params.showEntriesLength" :params="params"/>
            <data-table-search-filter v-if="params.showSearchFilter" :params="params"/>
        </div>
        -->
        <div class="data-table-container">
            <data-table-wrapper v-bind="{attributes, data, columns}" @toggleSorting="toggleSorting"/>
        </div>

        <!--
        <div>
            <data-table-entries-info v-if="params.showEntriesInfo" :params="params"/>
            <data-table-pagination v-if="params.showPagination" :params="params"/>
        </div>
        -->
    </div>
</template>

<script src="./DataTable.js"></script>
