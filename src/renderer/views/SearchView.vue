<script setup>
import { onActivated, onMounted, ref, shallowRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useSearchViewStore } from '../store/searchViewStore';
import AlbumListControl from '../components/AlbumListControl.vue';
import ArtistListControl from '../components/ArtistListControl.vue';
import SongListControl from '../components/SongListControl.vue';
import PlaylistsControl from '../components/PlaylistsControl.vue';

const props = defineProps({
    keyword: String
})

const { platforms, tabs, activeTab,currentPlatformIndex, tabTipText } = storeToRefs(useSearchViewStore())
const { setActiveTab,
    setCurrentPlatformIndex,
    updateTabTipText,
    isSongsTab,
    isPlaylistsTab,
    isAlbumsTab,
    isArtistsTab,
    currentVender
} = useSearchViewStore()

const currentTabView = shallowRef(null)
const tabData = ref([])

const visitTab = (index) => {
    if (index < 0 || activeTab.value == index) return
    setActiveTab(index)
    loadTab()
}

const updateTabData = (data) => {
    tabData.value.length = 0
    tabData.value.push(...data)
    updateTabTipText(tabData.value.length)
}

const loadSongs = () => {
    const vender = currentVender()
    if (!vender) return
    vender.searchSongs(props.keyword, 0, 50, 1).then(result => {
        updateTabData(result.data)
        currentTabView.value = SongListControl
    })
}

const loadPlaylists = () => {
    const vender = currentVender()
    if (!vender) return
    vender.searchPlaylists(props.keyword, 0, 50, 1).then(result => {
        updateTabData(result.data)
        currentTabView.value = PlaylistsControl
    })
}

const loadAlbums = () => {
    const vender = currentVender()
    if (!vender) return
    vender.searchAlbums(props.keyword, 0, 50, 1).then(result => {
        updateTabData(result.data)
        currentTabView.value = AlbumListControl
    })
}

const loadArtists = () => {
    const vender = currentVender()
    if (!vender) return
    vender.searchArtists(props.keyword, 0, 50, 1).then(result => {
        updateTabData(result.data)
        currentTabView.value = ArtistListControl
    })
}

const resetTabView = () => {
    currentTabView.value = null
}

const loadTab = () => {
    resetTabView()
    if (isSongsTab()) {
        loadSongs()
    } else if (isPlaylistsTab()) {
        loadPlaylists()
    }
    // else if (isAlbumsTab()) {
    //     loadAlbums()
    // } else if (isArtistsTab()) {
    //     loadArtists()
    // }
}

const byPlatform = (index) => {
    setCurrentPlatformIndex(index)
}

onActivated(() => {
    setCurrentPlatformIndex(0)
    visitTab(0)
})
watch(currentPlatformIndex, (nv, ov) => loadTab())
watch(activeTab, (nv, ov) => visitTab(nv))
watch(() => props.keyword, (nv, ov) => loadTab())
</script>

<template>
    <div id="search-view">

        <div class="header">

            <div class="keyword">
                <!-- <b>??????</b><span class="text">{{ keyword }}</span> -->
            </div>

            <div class="platform">
                <span class="item" :class="{ active: currentPlatformIndex == index }" v-for="(item, index) in platforms"
                    @click="byPlatform(index)">
                    {{ item.name }}
                </span>
            </div>

        </div>

        <div class="center">

            <div class="tab-nav">
                <span class="tab" :class="{ active: activeTab == index }" v-for="(tab, index) in tabs"
                    @click="visitTab(index)">
                    {{ tab.name }}
                </span>
                <span class="tip">{{ tabTipText }}</span>
            </div>

            <component :is="currentTabView" :data="tabData" :artistVisitable="true" :albumVisitable="true">
            </component>

        </div>
    </div>
</template>

<style lang="scss">
#search-view {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    padding: 20px 33px 15px 33px;
    overflow: auto;
    flex: 1;
}

#search-view .header {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}


#search-view .keyword b {
    margin-right: 12px;
}


#search-view .platform {
    margin-top: 20px;
    margin-bottom: 6px;
    text-align: left;
}

#search-view .platform .item {
    margin-right: 20px;
    border-radius: 10rem;
    padding: 6px 15px;
    // border: 1px solid #464646;
    cursor: pointer;
}

#search-view .platform .active {
    background: pink;
    color: #fff;
}

#search-view .tab-nav {
    display: flex;
    position: relative;
    height: 30px;
    margin-bottom: 3px;
    // border-bottom: 1px solid #464646;
}

#search-view .tab {
    font-size: 16px;
    padding-left: 6px;
    padding-right: 6px;
    margin-right: 15px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
}

#search-view .tab-nav .active {
    border-color: pink;
}

#search-view .tab-nav .tip {
    font-size: 15px;
    position: absolute;
    right: 10px;

    background-color: #000;
    // background: linear-gradient(to top right, #1ca388, #28c83f);
    -webkit-background-clip: text;
    color: transparent;
}
</style>