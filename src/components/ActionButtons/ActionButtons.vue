<template>
    <div>
        <button v-for="(icon, action, i) in actionIcons" :key="i"
            v-show="actions.includes(action)"
            @click="triggerAction(action)">
                {{ icon }}
        </button>
    </div>
</template>
<script src="./ActionButtons.js"></script>
