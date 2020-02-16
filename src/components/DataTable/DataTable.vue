<template>
    <div class="data-table">
        <div>
            <data-table-entries-length v-if="params.showEntriesLength"
                v-bind="{entryLength, entriesLength, entriesLengthText}" @select="toggleEntryLength"/>
            <!-- <data-table-search-filter v-if="params.showSearchFilter" :params="params"/> -->
        </div>

        <div class="data-table-container">
            <data-table-wrapper v-bind="{data, columns, tableAttributes, tableWrapperAttributes}"
                 @sort="toggleSorting"/>
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
