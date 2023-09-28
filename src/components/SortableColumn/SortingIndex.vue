<template>
    <span class="vdt-sorting-index">
        {{ index }}
    </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "VdtSortingIndex",
    props: {
        index: {
            type: Number,
            required: true
        }
    }
})
</script>
<style src="./SortingIndex.scss" lang="scss"></style>