<template>
    <div class="vdt-perpage">
        <span>{{ textBeforeOptions }}</span>
        <select @input="$emit('set-per-page')" :value="currentPerPage">
            <option v-for="(length, i) in perPageSizes" :key="i" :value="length">
                {{ length }}
            </option>
        </select>
        <span>{{ textAfterOptions }}</span>
    </div>
</template>
<script src="./PerPage.ts" lang="ts"></script>
<style src="./PerPage.scss" lang="scss"></style>