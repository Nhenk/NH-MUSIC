<!-- 比较鸡肋糟糕的组件设计，后期改掉 -->
<script setup>
const props = defineProps({
    data: Array
})
</script>

<template>
    <div class="textlist-ctl">
        <div v-for="item in data" v-html="item">
        </div>
    </div>
</template>

<style>
.textlist-ctl {
    text-align: left;
    color: #ccc;
    line-height: 30px;
    word-wrap: break-word;
    word-break: normal;
}

.textlist-ctl h2,
.textlist-ctl h3 {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: bold;
}

.textlist-ctl p {
    font-size: 14px;
    margin-bottom: 36px;
}
</style>