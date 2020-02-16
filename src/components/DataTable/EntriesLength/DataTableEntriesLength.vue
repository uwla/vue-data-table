<template>
    <div class="data-table-entries-length">
        {{ textBeforeEntries }}

        <select :value="entryLength" @input="$emit('select')">

            <option v-for="(length, i) in entriesLength" :key="i" :value="length">
                {{ length }}
            </option>

        </select>

        {{ textAfterEntries }}
    </div>
</template>


<script src="./DataTableEntriesLength.js"></script>
<style src="./DataTableEntriesLength.scss" lang="scss"></style>
