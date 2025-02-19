<template>
    <div
        ref="el"
        class="vdt-export"
    >
        <span>{{ downloadText }}</span>
        <select
            v-model="selectedExport"
            class="vdt-input"
        >
            <option
                v-for="(exportType, i) in allowedExports"
                :key="i"
                :value="exportType"
            >
                {{ exportType }}
            </option>
        </select>
        <button
            class="vdt-btn vdt-btn-primary"
            @click="download()"
        >
            {{ downloadButtonText }}
        </button>
    </div>
</template>
<script src="./ExportData.ts" lang="ts"></script>
<style src="./ExportData.scss" lang="scss"></style>
