<template>
    <span class="sorting-index">
        {{ index }}
    </span>
</template>

<script>
export default {
    name: "DataTableSortingIndex",
    props: {
        index: {
            type: Number,
            required: true
        }
    }
}
</script>

<style src="./SortingIndex.scss" lang="scss" scoped></style>
