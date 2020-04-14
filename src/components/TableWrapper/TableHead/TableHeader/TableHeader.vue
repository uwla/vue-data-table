<template>
    <th v-bind="attributes"
        @click="sortThisColumn">
        <div class="data-table-th-content">
            <span class="data-table-th-title">
                {{ title }}
            </span>
            <component  v-if="(sortIndex >= 0)"
                        :is="sortIndexComponent"
                        :index="(sortIndex + 1)"/>
            <component  v-if="orderable"
                        :is="sortIconComponent"/>
        </div>
    </th>
</template>

<script src="./TableHeader.js"></script>
<style lang="scss" scoped>
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
