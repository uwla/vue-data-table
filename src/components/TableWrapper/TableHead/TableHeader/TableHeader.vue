<template>
    <th v-bind="attributes" @click="sortThisColumn()" >
        <div class="data-table-th-content">
            <span
                class="data-table-th-title"
                v-html="title">
            </span>
            <component v-if="(sortingIndex >= 0)"
                       :is="sortIndexComponent"
                       :index="(sortingIndex + 1)" />
            <component v-if="orderable"
                       :is="sortIconComponent" />
        </div>
    </th>
</template>

<script src="./TableHeader.js"></script>

<style lang="scss">
.data-table-th {
    .data-table-th-content {
        display: flex;
        align-items: center;
    }

    &.sortable {
        cursor: pointer;

        &:hover {
            color: #3490dc;
        }
    }
}
</style>
