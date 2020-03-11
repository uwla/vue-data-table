<template>
    <thead>
        <tr>
            <data-table-th v-for="(col, i) in columns" :key="('th' + i)" :column="col"/>

            <th class="data-table-th-action" v-for="(actionText, j) in actionItems" :key="j">
                {{ actionText }}
            </th>
        </tr>
    </thead>
</template>

<script src="./TableHead.js"></script>
<style lang="css">
th {
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

th.data-table-th-action {
    text-align: center;
    width: 1px;
}
</style>
