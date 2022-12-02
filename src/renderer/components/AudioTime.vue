<!-- 歌曲的时长 就是  00:00/00:00 的那个 -->
<script setup>

const props = defineProps({
    current: String,
    duration: String
})
</script>

<template>
    <div class="audio-time">
        <span class="t-current">{{ current }}</span>
        <span> / </span>
        <span class="t-duration">{{ duration }}</span>
    </div>
</template>

<style scoped>
.audio-time span {
    vertical-align: middle;
    text-align: left;
}
</style>