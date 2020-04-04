<template>
    <div class="data-table-downloader">
        <span>
            {{ downloadText }}
        </span>
        <select v-model="exportType" class="form-control">
            <option
                v-for="(export_type, i) in allowedExports"
                :key="i"
                :value="export_type">

                {{ export_type.toUpperCase() }}
            </option>
        </select>
        <button class="btn btn-primary" @click="download()">
            {{ downloadButtonText }}
        </button>
    </div>
</template>

<script src="./ExportButton.js"></script>

<style lang="scss">
.data-table-downloader {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    *,
    input {
        width: auto;
        margin-left: 5px;
    }

    select:-moz-focusring {
        color: transparent;
        text-shadow: 0 0 0 #000;
    }
}
</style>
