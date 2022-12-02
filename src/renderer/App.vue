<script setup>
import { storeToRefs } from 'pinia';

import MainCenter from './layout/MainCenter.vue';
import { useMainViewStore } from './store/mainViewStore';

const { playbackQueueViewShow, playingViewShow } = storeToRefs(useMainViewStore())

</script>

<template>
    <MainCenter></MainCenter>

    <transition name="fade-y">
        <PlayingView id="playing-view" v-show="playingViewShow"></PlayingView>
    </transition>

    <PlaybackQueueView id="playback-queue" v-show="playbackQueueViewShow"></PlaybackQueueView>

</template>

<style lang="scss">
#playback-queue {
    position: absolute;
    top: 0;
    right: 0px;
    width: 335px;
    height: 100%;
    z-index: 99;
    background-color: #fff;
    box-shadow: 0px 0px 10px #161616;
    visibility: visible;
}

#playing-view {
    position: absolute;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 88;
    background-color: #fff;
}

/* fade-y */
.fade-y-enter-active,
.fade-y-leave-active {
    transition: all 0.3s ease;
}

.fade-y-enter-from,
.fade-y-leave-to {
    transform: translateY(-100%);
}

.fade-y-enter-to,
.fade-y-leave-from {
    transform: translateY(0);
}

/* fade-x */
.fade-x-enter-active,
.fade-x-leave-active {
    transition: all 0.5s ease-in-out;
}

.fade-x-enter-from,
.fade-x-leave-to {
    transform: translateX(520px);
}

.fade-x-enter-to,
.fade-x-leave-from {
    transform: translateX(0);
}
</style>
