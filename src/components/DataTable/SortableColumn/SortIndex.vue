<template>
    <span class="data-table-sort-index">
        {{ index }}
    </span>
</template>

<script>
export default {
    name: "DataTableSortIndex",
    props: {
        index: {
            type: Number,
            required: true
        }
    }
}
</script>

<style src="./SortIndex.css" lang="css"></style>
