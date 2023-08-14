<template>
    <div class="vdt-cell-editable">
        <div v-if="! isEditing" class="view-cell">
            <span>{{ data[columnKey] }}</span>
            <button class="vdt-btn vdt-action-edit" @click="edit()">
                <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="pencil" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path></g></svg>
            </button>
        </div>
        <div v-else class="edit-cell">
            <input type="text" class="vdt-input" v-model="text" />
            <button class="vdt-btn vdt-action-confirm" @click="finishEditing(true)">
                <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="check" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path></g></svg>
            </button>
            <button class="vdt-btn vdt-action-cancel" @click="finishEditing(false)">
                <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="x" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></g></svg>
            </button>
        </div>
    </div>
</template>
<script src="./TableCellEditable.js"></script>
<style src="./TableCellEditable.scss" lang="scss"></style>
