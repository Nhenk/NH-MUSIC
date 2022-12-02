<script setup>
import PlayAddAllBtn from '../components/PlayAddAllBtn.vue';
import AddFolderFileBtn from '../components/AddFolderFileBtn.vue';
import BatchDeleteBtn from '../components/BatchDeleteBtn.vue';
import { usePlayStore } from '../store/playStore';
import { useLocalMusicStore } from '../store/localMusicStore';
import { storeToRefs } from 'pinia';

const { addTracks, resetQueue, playNextTrack } = usePlayStore()
const { localDirs, localTracks, isLoading } = storeToRefs(useLocalMusicStore())
const { addFolders, addFiles, resetAll, removeItem } = useLocalMusicStore()

const playAll = () => {
    resetQueue()
    addAll()
    playNextTrack()
}

const addAll = () => {
    addTracks(localTracks.value)
}

const batchDelete = () => {
    //TODO
}

</script>

<template>
    <div id="local-music">
        <div class="header">
            <div>
                <img class="cover" src="/local_cover.png" />
            </div>
            <div class="right">
                <div class="title">本地歌曲</div>
                <div class="action">
                    <PlayAddAllBtn :playAction="playAll" :addAction="addAll"></PlayAddAllBtn>
                    <AddFolderFileBtn :leftAction="addFolders" :rightAction="addFiles" class="spacing">
                    </AddFolderFileBtn>
                    <BatchDeleteBtn :leftAction="batchDelete" :rightAction="resetAll" class="spacing"></BatchDeleteBtn>
                </div>
            </div>
        </div>

        <div class="center">
            <div class="list-title">歌曲({{ localTracks.length }})</div>
            <div class="songlist">
                <div v-for="(item, index) in localTracks">
                    <SongItem :index="index" :data="item" :artistVisiable="false" :albumVisiable="false"
                        :deleteFn="removeItem">
                    </SongItem>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
#local-music {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    overflow: auto;
    flex: 1;

    .header {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;

        .right {
            flex: 1;
            margin-left: 40px;
        }

        .title {
            text-align: left;
            margin-top: 5px;
            font-size: 25px;
            font-weight: 900;
            font-family:'Barlow';
        }

        .action {
            margin-top: 30px;
            display: flex;
        }

        .spacing {
            margin-left: 20px;
        }
    }

    .cover {
        width: 150px;
        height: 150px;
        border-radius: 6px;
        box-shadow: 0px 0px 10px #ea1e7a;
        // 下面是让图形变圆
        border-radius: 100px;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
    }

    .list-title {
        margin-bottom: 15px;
        text-align: left;
        font-size: 18px;
        background-color: #555;
        -webkit-background-clip: text;
        color: transparent;
    }

    .empty-tip,
    .loading-tip {
        margin-top: 66px;
        font-size: 18px;
        line-height: 28px;
        color: var(--text-sub-color);
    }

    .songlist {
        display: flex;
        flex-direction: column;

        .title {
            &:hover {
                .delete-btn {
                    visibility: visible;
                }
            }
        }
    }

    .artist span,
    .album span {
        cursor: default;
        color: #eee;
    }
}
</style>