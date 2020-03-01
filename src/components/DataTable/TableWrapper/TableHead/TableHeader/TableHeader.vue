<template>
    <th @click="sortThisColumn" v-bind="attributes">
        <div class="data-table-th-content">
            <span class="data-table-th-title">{{ title }}</span>
            <component :is="sortIndexComponent" v-if="(sortIndex >= 0)" :index="sortIndex + 1"/>
            <component :is="sortIconComponent" v-if="orderable"/>
        </div>
    </th>
</template>

<script src="./TableHeader.js"></script>
<style lang="scss">
th {
    .data-table-th-content {
        display: flex;
        align-items: center;
    }

    &.sortable {
        cursor: pointer;

        &:hover {
            color: #3490DC;
        }
    }
}
</style>
