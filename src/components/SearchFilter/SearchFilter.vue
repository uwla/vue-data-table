<template>
    <div class="vdt-search">
        <span>{{ searchText }}</span>
        <input class="vdt-input" type="search" :value="search" @input="$emit('set-search')" />
    </div>
</template>
<script src="./SearchFilter.ts" lang="ts"></script>
<style src="./SearchFilter.scss" lang="scss"></style>