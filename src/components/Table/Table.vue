<template>
    <div class="vdt-table">
        <table :class="tableClass">
            <!-- TABLE HEAD -->
            <thead>
                <tr>
                    <!-- COLUMN HEADER -->
                    <th v-for="(column, i) in (columns as any)" :key="i"
                        class="vdt-column"
                        :class="column.cssClass"
                        :data-sortable="column.sortable"
                        :data-sorting="column.sortingMode"
                        @click="$emit('sort-column', column)">

                        <!-- COLUMN HEADER CONTENT -->
                        <div class="vdt-column-content">
                            <span>{{ column.title }}</span>

                            <!-- SORTING INDEX -->
                            <component v-if="column.sortingIndex > 0"
                                :is="sortingIndexComponent as any"
                                :index="column.sortingIndex" />

                            <!-- SORTING ICON -->
                            <component v-if="column.sortable"
                                :is="sortingIconComponent as any" />
                        </div>
                    </th>
                </tr>
            </thead>

            <!-- TABLE BODY -->
            <tbody v-if="! isLoading">

                <!-- EMPTY BODY -->
                <tr v-if="isEmpty">
                    <td :colspan="numberOfColumns" class="vdt-empty-body">
                        {{ emptyTableText }}
                    </td>
                </tr>

                <!-- NON-EMPTY BODY -->
                <tr v-for="(data, i) in dataDisplayed" :key="i">
                    <td v-for="(column, j) in (columns as any)" :key="j">
                        <component :is="column.component"
                            v-bind="{ data, ...column.componentProps }"
                            @userEvent="emitUserEvent" />
                    </td>
                </tr>
            </tbody>

            <!-- COMPONENT IF LOADING -->
            <component v-if="isLoading" :is="loadingComponent as any" />

            <!-- TABLE FOOTER -->
            <component v-if="footerComponent" :is="footerComponent as any"
                    v-bind="{ data, dataDisplayed, dataFiltered }" />
        </table>
    </div>
</template>
<script src="./Table.ts" lang="ts"></script>
<style src="./Table.scss" lang="scss"></style>