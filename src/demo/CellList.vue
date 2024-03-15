<template>
    <ul>
        <li v-for="fruit,i in data.fruits" :key="i">
            {{  fruit }}
        </li>
    </ul>
</template>
<script>
export default {
    name: "CellList",
    props: ['data'],
}
</script>