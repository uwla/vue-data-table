<template>
    <div class="vdt-action-buttons">
        <button v-for="(action, i) in (actions as string[])" :key="i"
            class="vdt-btn"
            :class="`vdt-action-${action}`"
            @click="triggerAction(action)">
            {{ actionIcons[action] }}
        </button>
    </div>
</template>
<script src="./ActionButtons.ts" lang="ts"></script>
<style src="./ActionButtons.scss" lang="scss"></style>