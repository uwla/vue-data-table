<template>
    <div class="vdt-export">
        <span>{{ downloadText }}</span>
        <select class="vdt-input" v-model="selectedExport">
            <option v-for="(exportType, i) in allowedExports" :key="i" :value="exportType">
                {{ exportType }}
            </option>
        </select>
        <button class="vdt-btn vdt-btn-primary" @click="download()">
            {{ downloadButtonText }}
        </button>
    </div>
</template>
<script src="./ExportData.ts" lang="ts"></script>
<style src="./ExportData.scss" lang="scss"></style>