<!-- 歌手信息 -->

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, shallowRef, watch } from 'vue';
import AlbumListControl from '../components/AlbumListControl.vue';
import TextListControl from '../components/TextListControl.vue';
import PlayAddAllBtn from '../components/PlayAddAllBtn.vue';
import SongListControl from '../components/SongListControl.vue';
import { useArtistDetailStore } from '../store/artistDetailStore';
import { usePlatformStore } from '../store/platformStore';
import { usePlayStore } from '../store/playStore';

const props = defineProps({
    platform: String,
    id: String
})

const { artistId, artistName, artistCover, artistAlias, tabTipText,
        activeTab, tabs, hotSongs, allSongs, albums, about
    } = storeToRefs(useArtistDetailStore())
const { setActiveTab, updateArtist,
        updateHotSongs, updateAllSongs, appendAllSongs, 
        updateAlbums, updateAbout, 
        resetAll, updateTabTipText,
        isHotSongsTab, isAllSongsTab, 
        isAlbumsTab, isAboutTab,
        isHotSongsTabLoaded,
        isAllSongsTabLoaded,
        isAlbumsTabLoaded,
        isAboutTabLoaded
    } = useArtistDetailStore()

const { getVender, isKuWo } = usePlatformStore()
const { addTracks, playNextTrack, resetQueue } = usePlayStore()

const artistDetailRef = ref(null)
const currentTabView = shallowRef(null)
const tabData = ref([])
let offset = 0
let page = 1
let limit = 30

const visitTab = (index) => {
    setActiveTab(index)
    switchTab()
}

const playHotSongs = () => {
    resetQueue()
    addHotSongs()
    playNextTrack()
}

const addHotSongs = () => {
    addTracks(hotSongs.value)
}

const playAllSongs = () => {
    resetQueue()
    addAllSongs()
    playNextTrack()
}

const addAllSongs = () => {
    addTracks(allSongs.value)
}

const updateTabData = (data) => {
    tabData.value.length = 0
    if(typeof(data) == 'string') {
        tabData.value.push(data)
        updateTabTipText(0)
    } else {
        tabData.value.push(...data)
        updateTabTipText(tabData.value.length)
    }
}

const loadHotSongs = () => {
    if(isHotSongsTabLoaded()) {
        updateTabData(hotSongs.value)
        currentTabView.value = SongListControl
        return 
    }
    const vender = getVender(props.platform)
    if(!vender) return
    const id = artistId.value
    vender.artistDetailHotSongs(id).then(result => {
        console.log(result)
        updateArtist(result.name, result.cover)
        updateHotSongs(result.data)
        updateTabData(hotSongs.value)
        currentTabView.value = SongListControl
    })
}

const loadMoreSongs = () => {
    const vender = getVender(props.platform)
    if(!vender) return
    const id = artistId.value
    vender.artistDetailAllSongs(id, offset, limit, page).then(result => {
        appendAllSongs(result.data)
        updateTabData(allSongs.value)
        currentTabView.value = SongListControl
    })
    offset = page++ * limit
}

const loadAllSongs = () => {
    if(isAllSongsTabLoaded()) {
        updateTabData(allSongs.value)
        currentTabView.value = SongListControl
        return 
    }
    const vender = getVender(props.platform)
    if(!vender) return
    const id = artistId.value
    vender.artistDetail(id).then(result => {
        console.log(result)
        updateArtist(result.name, result.cover)
        if(result.about) {
            updateAbout(result.about)
        }
    })
    vender.artistDetailAllSongs(id, offset, limit, page).then(result => {
        updateAllSongs(result.data)
        updateTabData(allSongs.value)
        currentTabView.value = SongListControl
    })
    offset = page++ * limit
}

const loadAlbums = () => {
    if(isAlbumsTabLoaded()) {
        updateTabData(albums.value)
        currentTabView.value = AlbumListControl
        return 
    }
    const vender = getVender(props.platform)
    if(!vender) return
    const id = artistId.value
    //TODO
    vender.artistDetailAlbums(id, 0, 365, 1).then(result => {
        console.log(result)
        updateAlbums(result.data)
        updateTabData(albums.value)
        currentTabView.value = AlbumListControl
    })
}

const loadAbout = () => {
    if(isAboutTabLoaded()) {
        updateTabData(about.value)
        updateTabTipText(0)
        currentTabView.value = TextListControl
        return 
    }
    const vender = getVender(props.platform)
    if(!vender) return
    const id = artistId.value
    vender.artistDetailAbout(id).then(result => {
        //console.log(result)
        updateAbout(result)
        updateTabData(result)
        updateTabTipText(0)
        currentTabView.value = TextListControl
    })
}

const scrollToTop = () => {
    artistDetailRef.value.scrollTop = 0
}

const scrollToLoad = () => {
    const scrollTop = artistDetailRef.value.scrollTop
    const scrollHeight = artistDetailRef.value.scrollHeight
    const clientHeight = artistDetailRef.value.clientHeight
    if((scrollTop + clientHeight) >= scrollHeight) {
       loadMoreSongs()
    }
}

const resetTabView = () => {
    currentTabView.value = null
    artistDetailRef.value.removeEventListener('scroll', scrollToLoad)
}

const bindScrollListener = () => {
    artistDetailRef.value.addEventListener('scroll', scrollToLoad)
}

const switchTab = () => {
    resetTabView()
    if(isHotSongsTab()) {
        loadHotSongs()
    } else if(isAllSongsTab()) {
        loadAllSongs()
        bindScrollListener()
    } else if(isAlbumsTab()) {
        loadAlbums()
    } else if(isAboutTab()) {
        loadAbout()
    }
}

const reloadAll = () =>  {
    resetAll()
    scrollToTop()
    visitTab(0)
}

/*-------------- 各种监听 --------------*/
onMounted(() => reloadAll())
watch(artistId, (nv, ov) => reloadAll())
watch(activeTab, (nv,ov) => loadTab())
</script>

<template>
    <div id="artist-detail" ref="artistDetailRef">
        <div class="header">
            <div>
                <img class="cover" v-lazy="artistCover" />
            </div>
            <div class="right">
                <div class="title">{{ artistName }}</div>
                <div class="alias">{{ artistAlias }}</div>
                <div class="action">
                    <PlayAddAllBtn :playAction="playHotSongs" :addAction="addHotSongs" v-show="isHotSongsTab()" text="播放热门歌曲"></PlayAddAllBtn>
                    <PlayAddAllBtn :playAction="playAllSongs" :addAction="addAllSongs" v-show="isAllSongsTab()" text="播放全部"></PlayAddAllBtn>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="tab-nav">
                <span class="tab" :class="{ active: activeTab == index }"
                    v-for="(tab,index) in tabs" @click="visitTab(index)">
                    {{ tab.name }}
                </span>
                <span class="tab-tip">{{ tabTipText }}</span>
            </div>
            <component :is="currentTabView" :data="tabData" 
                :artistVisitable="true" 
                :albumVisitable="true">
            </component>
        </div>
    </div>
</template>

<style>
#artist-detail {
    display: flex;
    flex-direction: column;
    padding: 25px 33px 15px 33px;
    flex: 1;
    overflow: auto;
}

#artist-detail .header {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
}

#artist-detail .header .right {
    flex: 1;
    margin-left: 20px;
}

#artist-detail .header .title{
    text-align: left;
    margin-top: 5px;
    margin-bottom: 30px;
    font-size: 25px;
    font-weight: bold;
}

#artist-detail .header .cover {
    width: 168px;
    height: 168px;
    border-radius: 10rem;
    box-shadow: 0px 0px 10px #161616;
}

#artist-detail .tab-nav {
    position: relative;
    display: flex;
    height: 30px;
    margin-bottom: 3px;
    border-bottom: 1px solid #464646;
}

#artist-detail .tab {
    font-size: 16px;
    padding-left: 6px;
    padding-right: 6px;
    margin-right: 15px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
}

#artist-detail .tab-tip {
    position: absolute;
    right: 10px;
    font-size: 16px;
    background: linear-gradient(to top right, #1ca388, #28c83f);
    -webkit-background-clip: text;
    color: transparent;
}

#artist-detail .tab-nav .active {
    border-color: #28c83f;
}

#artist-detail  .songlist {
    display: flex;
    flex-direction: column;
}
</style>