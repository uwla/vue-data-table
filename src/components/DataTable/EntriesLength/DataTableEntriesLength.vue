<template>
    <div class="data-table-entries-length">
        <span>{{ textBeforeEntries }}</span>

        <select :value="entryLength" @input="$emit('select')">

            <option v-for="(length, i) in lengths" :key="i" :value="length">
                {{ length }}
            </option>

        </select>

        <span>{{ textAfterEntries }}</span>
    </div>
</template>


<script src="./DataTableEntriesLength.js"></script>
<style src="./DataTableEntriesLength.scss" lang="scss"></style>
