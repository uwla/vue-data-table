<template>
    <span class="vdt-sorting-index">
        {{ index }}
    </span>
</template>
<script>
export default {
    name: "VueDataTableSortingIndex",
    props: {
        index: {
            type: Number,
            required: true
        }
    }
};
</script>
<style src="./SortingIndex.scss" lang="scss"></style>
