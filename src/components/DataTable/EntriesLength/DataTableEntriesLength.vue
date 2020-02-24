<template>
    <div class="data-table-entries-length">
        <span>{{ textBeforeEntries }}</span>

        <select :value="currentEntryLength" @input="$store.commit('toggleEntryLength')">
            <option v-for="(length, i) in entriesLengths" :key="i" :value="length">
                {{ length }}
            </option>
        </select>

        <span>{{ textAfterEntries }}</span>
    </div>
</template>


<script src="./DataTableEntriesLength.js"></script>
<style src="./DataTableEntriesLength.scss" lang="scss"></style>
