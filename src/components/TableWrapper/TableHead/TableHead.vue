<template>
    <thead>
        <tr>
            <data-table-th  v-for="(column, index) in columns"
                            :key="('th' + index)"
                            :column="column"/>

            <th v-for="(actionText, index) in actionItems"
                class="data-table-th data-table-action-column"
                :key="index">
                {{ actionText }}
            </th>
        </tr>
    </thead>
</template>

<script src="./TableHead.js"></script>
<style lang="css">
.data-table-th {
    white-space: nowrap;
    background-color: white;
    position: sticky;
    padding: 1rem 0.75rem;
    border: none !important;
    box-shadow: inset 0px 11px .75px -10px #ddd,
                inset 0px -11px .75px -10px #ddd;
    line-height: 1;
    top: 0;
    user-select: none;

}

.data-table-action-column {
    text-align: center;
    width: 1px;
}
</style>
