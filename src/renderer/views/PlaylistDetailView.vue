<!-- 进入专辑里面 -->
<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import PlayAddAllBtn from '../components/PlayAddAllBtn.vue';
import { usePlatformStore } from '../store/platformStore'
import { usePlayStore } from '../store/playStore';
import SongListControl from '../components/SongListControl.vue';

const { getVender } = usePlatformStore()
const { addTracks, resetQueue, playNextTrack } = usePlayStore()

const props = defineProps({
    platform: String,
    id: String
})

const detail = reactive({})
const listSize = ref(0)
let offset = 0
let page = 1
let limit = 1000

const loadContent = () => {
    const vender = getVender(props.platform)
    if (vender) {
        vender.playlistDetail(props.id, offset, limit, page).then(result => {
            console.log(result)
            Object.assign(detail, result)
            listSize.value = detail.data.length
        })
    }
}

onBeforeMount(() => {
    loadContent()
})

const playAll = () => {
    resetQueue()
    addAll()
    playNextTrack()
}

const addAll = () => {
    addTracks(detail.data)
}
</script>

<template>
    <div id="playlist-detail">

        <div class="header">

            <div>
                <!-- 专辑图片 -->
                <img class="cover" v-lazy="detail.cover" />
                <!-- 专辑图片 -->

                <!-- 滤镜 -->
                <div class="filter">
                    <img class="shadow" v-lazy="detail.cover">
                </div>
                <!-- 滤镜 -->

            </div>


            <div class="right">
                <div class="title">{{ detail.title }}</div>
                <div class="about">
                    {{ detail.about }}
                </div>
                <div class="action">
                    <!-- <PlayAddAllBtn :playAction="playAll" :addAction="addAll"></PlayAddAllBtn> -->
                </div>
            </div>


        </div>


        <div class="center">
            <div class="list-title">歌曲 ({{ listSize }})</div>
            <SongListControl :data="detail.data" :artistVisitable="true" :albumVisitable="true"></SongListControl>
        </div>
    </div>
</template>

<style lang="scss">
#playlist-detail {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 100px 33px 10px 33px;
    overflow: auto;

    .header {
        position: relative;
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;

        .right {
            flex: 1;
            margin-left: 20px;
        }

        .title,
        .about {
            text-align: left;
            margin-bottom: 13px;
        }

        .title {
            font-size: 36px;
            font-family: Barlow;
            font-weight: 900;
            color: #000;
        }

        .about {
            height: 119px;
            line-height: 20px;
            color: #bababa;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
        }

        .cover {
            width: 202px;
            height: 202px;
            border-radius: 6px;
        }

        // 滤镜
        .shadow {
            position: absolute;
            display: flex;
            top: 10px;
            background: transparent;
            filter: blur(16px) opacity(0.6);
            transform: scale(0.92, 0.96);
            border-radius: 0.75em;
            z-index: -1;
            width: 202px;
            height: 202px;
        }
    }

    .list-title {
        margin-bottom: 15px;
        text-align: left;
        font-size: 18px;
        background: #000;
        -webkit-background-clip: text;
        color: transparent;
        font-family: Barlow;
        font-weight: 700;
    }


}
</style>