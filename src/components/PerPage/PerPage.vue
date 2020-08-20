<template>
    <div class="data-table-per-page">
        <span>
            {{ textBeforeSelector }}
        </span>

        <select @input="$emit('setPerPage')" :value="currentPerPage">
            <option v-for="(length, i) in perPageSizes" :key="i" :value="length">
                {{ length }}
            </option>
        </select>

        <span>
            {{ textAfterSelector }}
        </span>
    </div>
</template>

<script src="./PerPage.js"></script>
<style src="./PerPage.scss" lang="scss"></style>
