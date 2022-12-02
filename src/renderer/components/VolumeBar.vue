<!-- 音量控制条 -->
<script setup>
import { ref,watch } from 'vue';
import EventBus from '../../common/EventBus';
import SliderBar from './SliderBar.vue';
import { usePlayStore } from '../store/playStore';
import { storeToRefs } from 'pinia';
import ButtonIcon from './ButtonIcon.vue';

const status = ref(2)
const sliderRef = ref(null)
const { updateVolume } = usePlayStore()
const { volume } = storeToRefs(usePlayStore())

const setVolume = (value) => {
    updateUI(value)
    emitUpdate(value)
}

//仅更新UI
const updateUI = (value) => {
    status.value = value > 0.5 ? 2 : (value > 0 ? 1 : 0)
    sliderRef.value.updateProgress(value)
}

// 更新数据
const emitUpdate = (value) => {
    //更新Store
    updateVolume(value)
    //通知Player
    // volume-changed 是事件名   value 是要发送的数据
    EventBus.emit("volume-changed", value)
}

const toggleMute = ()=> {
    emitUpdate(sliderRef.value.toggleProgress())
}

watch(volume, (nv, ov) => {
    updateUI(nv)
})

defineExpose({
    setVolume
})
</script>

<template>

    <div class="volume-bar">
        
        <button-icon class="volume-status" @click="toggleMute">
                <svg v-show="status == 2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512" class="svg-inline--fa fa-volume fa-w-15 fa-2x"><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.53 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z" class=""></path></svg>
                <svg v-show="status == 1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-down" class="svg-inline--fa fa-volume-down fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M215.03 72.04L126.06 161H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V89.02c0-21.47-25.96-31.98-40.97-16.98zm123.2 108.08c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 229.28 336 242.62 336 257c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.87z"></path></svg>
                <svg v-show="status == 0" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-mute" class="svg-inline--fa fa-volume-mute fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"></path></svg>
        </button-icon>

        <SliderBar class="volume-value" ref="sliderRef" :onseek="emitUpdate" :initValue="0.5"></SliderBar>
    </div>

</template>

<style lang="scss">
.volume-bar {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: 4px;
    -webkit-app-region: none;

    .volume-status {
    margin-top: 3px;
    cursor: pointer;

        svg {
            width: 22px;
            height: 22px;
            }
    }

    .volume-value {
        margin-left: 5px;
        width: 80px;
        height: 3px;
        border-radius: 10rem;
    }

    .thumb {
        visibility: hidden;
    }

    &:hover {
        .volume-value .thumb {
        visibility: visible;
        }
    }

}


</style>