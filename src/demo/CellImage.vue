<template>
    <img class="cell-img" :src="data.photo" alt="user image" />
</template>
<script>
export default {
    name: "CellImage",
    props: ['data']
}
</script>
<style>
.cell-img {
    max-height: 250px;
    margin: 0 auto;
}
</style>