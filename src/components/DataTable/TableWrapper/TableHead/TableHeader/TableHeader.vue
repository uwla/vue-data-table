<template>
    <th @click="sortThisColumn" v-bind="attributes">
        <div class="data-table-thead-content">
            <span class="data-table-column-title">
                {{ title }}
            </span>

            <span class="data-table-sorting-index" v-if="sortIndex >= 0">
                {{ sortIndex + 1 }}
            </span>

            <span class="data-table-sorting-icon" v-if="orderable">
                &nbsp;
            </span>
        </div>
    </th>
</template>

<script src="./TableHeader.js"></script>
