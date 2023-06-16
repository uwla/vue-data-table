<template>
    <div class="vdt-search">
        <span>{{ searchText }}</span>
        <input type="search" :value="search" @input="$emit('set-search')" />
    </div>
</template>
<script src="./SearchFilter.js"></script>
<style src="./SearchFilter.scss" lang="scss"></style>
