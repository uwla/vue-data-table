<template>
    <div class="vdt-table">
        <table :class="tableClass">
            <!-- TABLE HEAD -->
            <thead>
                <tr>
                    <!-- COLUMN HEADER -->
                    <th
                        v-for="(column, i) in columns"
                        :key="i"
                        class="vdt-column"
                        :class="column.cssClass"
                        :data-sortable="column.sortable"
                        :data-sorting="column.sortingMode"
                        :data-collapsed="column.collapsed"
                        @click="$emit('sort-column', column)"
                    >
                        <div
                            v-if="column.collapsible && column.collapsed"
                            class="vdt-column-collapse"
                            @click="column.collapsed = false"
                        >
                            [+]
                            <span>{{ column.title }}</span>
                        </div>

                        <!-- COLUMN HEADER CONTENT -->
                        <div
                            v-else
                            class="vdt-column-content"
                        >
                            <span>{{ column.title }}</span>

                            <!-- SORTING INDEX -->
                            <component
                                :is="sortingIndexComponent"
                                v-if="column.sortingIndex > 0"
                                :index="column.sortingIndex"
                            />

                            <!-- SORTING ICON -->
                            <component
                                :is="sortingIconComponent"
                                v-if="column.sortable"
                            />

                            <div
                                v-if="column.collapsible && !column.collapsed"
                                class="vdt-column-collapse"
                                @click="column.collapsed = true"
                            >
                                [-]
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>

            <!-- TABLE BODY -->
            <tbody v-if="!isLoading">
                <!-- EMPTY BODY -->
                <tr v-if="isEmpty">
                    <td
                        :colspan="numberOfColumns"
                        class="vdt-empty-body"
                    >
                        {{ emptyTableText }}
                    </td>
                </tr>

                <!-- NON-EMPTY BODY -->
                <tr
                    v-for="data in dataDisplayed"
                    :key="(data._key)"
                >
                    <td
                        v-for="(column, j) in columns"
                        :key="data._key + '_' + j"
                    >
                        <div
                            v-if="column.collapsible && column.collapsed"
                        ></div>
                        <component
                            v-bind="{ data, ...column.componentProps }"
                            :is="column.component"
                            v-else
                            @user-event="emitUserEvent"
                        />
                    </td>
                </tr>
            </tbody>

            <!-- COMPONENT IF LOADING -->
            <component
                :is="loadingComponent"
                v-if="isLoading"
            />

            <!-- TABLE FOOTER -->
            <component
                v-bind="{ data, dataDisplayed, dataFiltered }"
                :is="footerComponent"
                v-if="footerComponent"
            />
        </table>
    </div>
</template>
<script src="./Table.ts" lang="ts"></script>
<style src="./Table.scss" lang="scss"></style>
