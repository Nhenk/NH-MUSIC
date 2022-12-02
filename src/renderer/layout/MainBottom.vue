<script setup>
import PlayMeta from '../components/PlayMeta.vue';

// 引入函数库
import { ref, watch } from 'vue';

// 引入插件
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

//
import { usePlayStore } from '../store/playStore';


import EventBus from '../../common/EventBus';
import VolumeBar from '../components/VolumeBar.vue';
import RightControlButtons from '../components/RightControlButtons.vue'
import ProgressBar from '../components/ProgressBar.vue';


const router = useRouter()
const progressBarRef = ref(null)
// 进度条进度
const { progress } = storeToRefs(usePlayStore())

const visitSettingView = () => {
    router.push('/setting')
}

const seekTrack = (percent) => {
    EventBus.emit('track-seek', percent)
}

watch(progress, (nv, ov) => {
    progressBarRef.value.updateProgress(nv)
})
</script>

<template>
    <div id="main-bottom">

        <!-- 歌曲进度条 -->
        <ProgressBar class="progressBar" ref="progressBarRef" :onseek="seekTrack"></ProgressBar>
        <!-- 歌曲进度条 -->

        <!-- 播放控制 -->
        <div id="play-nav">
            <div class="left-controls-buttons"><PlayMeta id="play-meta"></PlayMeta></div>
            <div class="middle-controls-buttons"><PlayControl id="play-ctl"></PlayControl></div>
            <div class="right-controls-buttons">
                <VolumeBar id="volumeBar"></VolumeBar> 
                <!-- <RightControlButtons></RightControlButtons> -->
            </div>
        </div>
        <!-- 播放控制 -->

    </div>
                <!-- <div id="setting-btn" @click="visitSettingView">
                </div> -->
</template>

<style lang="scss" scoped>
#main-bottom {
    display: flex;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: space-around;
    height: 64px;
    z-index: 100;
    /* 下面这句是Electron用来拖拽窗口用的，给谁加谁就能拖动 */
    /* -webkit-app-region: drag; */

    background-color: var(--color-navbar-bg);
    backdrop-filter: saturate(180%) blur(20px);
}
#play-nav {
    display: grid;
    padding: 0px 5vw;
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
}
/* 父盒子flex布局对其方式 */
.right-controls-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}























#play-nav #play-meta {
    width: 33.83%;
}

#play-nav #play-ctl {
    flex: 1;
    align-items: center;
    justify-content: center;
    /* margin-left: 15px; */
    margin-right: 15px;
}

#play-nav .top-right {
    width: 39.83%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

#setting-btn {
    cursor: pointer;
    -webkit-app-region: none;
    margin-right: 10px;
}

#setting-btn svg {
    margin-top: 4px;
    margin-left: 15px;
    fill: var(--svg-color);
}

/* 设置按钮的hover */
#setting-btn svg:hover {
    fill: linear-gradient(to top right, #28c83f, #1ca388) !important;
    fill: #28c83f;
}
</style>