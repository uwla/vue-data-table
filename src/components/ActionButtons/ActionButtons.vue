<template>
    <div class="vdt-action-buttons">
        <button v-for="(icon, action, i) in actionIcons" :key="i"
            v-show="actions.includes(action)"
            :class="'vdt-action-' + action"
            @click="triggerAction(action)">
                {{ icon }}
        </button>
    </div>
</template>
<script src="./ActionButtons.js"></script>
<style src="./ActionButtons.scss" lang="scss"></style>
