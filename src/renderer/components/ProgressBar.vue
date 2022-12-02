<!-- 音乐进度条 -->
<script setup>
import { ref } from 'vue';



const barRef = ref(null)
const barValueRef = ref(null)




const props = defineProps({
    onseek: Function
})



const seek = (e) => {
    const offsetX = e.offsetX
    const offsetWidth = barRef.value.offsetWidth
    const percent = (offsetX / offsetWidth).toFixed(3)
    if (props.onseek) {
        props.onseek(percent)
    }
}

const updateProgress = (percent) => {
    percent = percent * 100
    barValueRef.value.style.width = percent + "%"
}

defineExpose({
    updateProgress
})

// --------------------------------------







</script>

<template>
    <div class="progress-bar" ref="barRef" @click="seek">
        <div class="progress" ref="barValueRef"></div>
    </div>
</template>

<style scoped>
.progress-bar {
    height: 10rem;
    margin-top: -6px;
    z-index: 100;
    /* margin-bottom: -6px; */
    border-radius: 10rem;
    background: #e8e8e8;
    cursor: pointer;
}

.progress-bar .progress {
    width: 0%;
    height: 100%;
    border-radius: 10rem;
    background-color: #335eea;
}
</style>