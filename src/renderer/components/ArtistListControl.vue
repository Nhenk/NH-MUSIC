<!-- 搜索后的 歌手中的 歌手列表-->
<script setup>
import { useRouter } from 'vue-router';
import PaginationTiles from './PaginationTiles.vue';
import { useArtistDetailStore } from '../store/artistDetailStore';
import { usePlatformStore } from '../store/platformStore';

const props = defineProps({
    data: Array
})

const router = useRouter()
const { updateArtistDetailKeys } = useArtistDetailStore()
const { updateCurrentPlatformByCode } = usePlatformStore()

const visitItem = (platform, id) => {
    const platformValid = platform && (platform.trim().length > 0)
    const idValid = (id != 0)
    const visitable = platformValid && idValid
    if (visitable) {
        router.push('/artist/' + platform + "/" + id)
        updateArtistDetailKeys(platform, id)
        updateCurrentPlatformByCode(platform)
    }
}

</script>

<template>
    <div class="artistlist-ctl">
        <PaginationTiles>
            <template #data>
                <ImageTextTile v-for="item in data" :cover="item.cover" :title="item.title"
                    @click="visitItem(item.platform, item.id)">
                </ImageTextTile>
            </template>
        </PaginationTiles>
    </div>
</template>

<style>
.artistlist-ctl .image-text-tile {
    margin-top: 25px !important;
    margin-bottom: 15px;
}

.artistlist-ctl .image-text-tile .cover {
    border-radius: 10rem !important;
}

.artistlist-ctl .image-text-tile .title {
    text-align: center !important;
    margin-top: 10px !important;
}
</style>