<template>
    <div class="data-table-entries-length">
        <span v-if="(textBeforeEntries !== '')">
            {{textBeforeEntries}}
        </span>

        <select @input="$store.commit('dataTable/toggleEntryLength')"
                :value="currentEntryLength">
            <option v-for="(length, i) in entriesLengths"
                    :key="i"
                    :value="length">
                {{length}}
            </option>
        </select>

        <span v-if="(textAfterEntries !== '')">
            {{textAfterEntries}}
        </span>
    </div>
</template>


<script src="./EntriesLength.js"></script>
<style src="./EntriesLength.scss" lang="scss"></style>
