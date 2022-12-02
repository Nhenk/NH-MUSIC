<!-- 底部左边的播放专辑图片和专辑名字和作者还有我喜欢图标 -->
<script setup>
import AudioTime from './AudioTime.vue';
import { useMainViewStore } from '../store/mainViewStore';
import { usePlayStore } from '../store/playStore';
import { storeToRefs } from 'pinia';


const { currentTrack, mmssCurrentTime } = storeToRefs(usePlayStore())
const { coverMaskShow } = storeToRefs(useMainViewStore())
const { showPlayingView, toggleCoverMask } = useMainViewStore()

</script>

<template>

        <!-- <div class="cover-wrap" @mouseenter="toggleCoverMask" @mouseleave="toggleCoverMask"> -->



            <!-- <div class="cover-mask" v-show="coverMaskShow" @click="showPlayingView">
                <div class="down-btn">
                    <svg viewBox="0 0 763.32 424.57" xmlns="http://www.w3.org/2000/svg">
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path
                                    d="M380.47,322.11c27.6-27.5,54-53.68,80.23-80Q575,127.75,689.38,13.4C708.7-5.81,735-2.92,750.83,12.91c17,17,16.57,43.39-.9,60.87L414.1,409.61c-19.89,19.89-45,20-64.9.08Q180.9,241.45,12.66,73.15A42.53,42.53,0,1,1,72.85,13Q224.7,164.87,376.48,316.73A46.1,46.1,0,0,1,380.47,322.11Z" />
                            </g>
                        </g>
                    </svg>
                </div>
            </div> -->




            <!-- <div class="time-volume-wrap"> -->
                <!-- <AudioTime :current="mmssCurrentTime" :duration="currentTrack.mmssDuration()"></AudioTime> -->
            <!-- </div> -->

        <!-- </div> -->
        <div class="play-meta">
            <img class="audio-cover" v-lazy="currentTrack.cover" />

            <div class="audio-title">
                <div class="audio-name">{{ currentTrack.title }}</div>
                <div class="artist-name">{{ currentTrack.artistName()}}</div>
            </div>

        </div>

</template>

<style>
.play-meta {
    display: flex;
    height: 64px;
    align-items: center;
}
.audio-cover {
    height: 46px;
    border-radius: 5px;
    box-shadow: 0 6px 8px -2px rgb(0 0 0 / 16%);
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
}
.audio-title {
    display: flex;
    height: 46px;
    margin-left: 12px;
    flex-direction: column;
    justify-content: center;

    /* white-space:nowmal:忽略多余的空白，元素内如果有多个空格在一起或换行符（回车键），
    浏览器会把其看作一个空格来处理，不会影响自动换行（就是元素内容过长，在一行上显示不完，会从下一行开始） */
    white-space: nowrap;
    /* 上面这个很重要，删了会导致文字竖排 */
    text-overflow: ellipsis;
    text-align: left;
}
.audio-name {

    font-weight: 600;
    font-size: 16px;
    opacity: 0.88;
    color: var(--color-text);
    margin-bottom: 4px;

}
.artist-name {
    
    font-size: 12px;
    opacity: 0.58;
    color: var(--color-text);
    overflow: hidden;
}





</style>
