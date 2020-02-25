<template>
    <thead>
        <tr>
            <data-table-th v-for="(col, i) in columns" :key="('th' + i)" :column="col"/>

            <th class="data-table-action-th" v-for="(actionText, j) in actionItems" :key="j">
                {{ actionText }}
            </th>
        </tr>
    </thead>
</template>


<script src="./TableHead.js"></script>
