<script setup>
import { useRouter } from 'vue-router';
import { usePlatformStore } from '../store/platformStore';

const router = useRouter()
const { updateCurrentPlatformByCode } = usePlatformStore()

router.beforeResolve((to, from) => {
    console.log("当前路由:" + to.path)
    highlightPlatform(to)
})

const highlightPlatform = (to) => {
    const path = to.path
    let code = ''
    if (path.startsWith('/square') || path.startsWith('/playlist')
        || path.startsWith('/artist') || path.startsWith('/album')) {
        code = path.split('/')[2]
    } else if (path.startsWith('/local')) {
        code = 'local'
    }
    updateCurrentPlatformByCode(code)
}

const excludes = ['PlaylistDetailView', 'ArtistDetailView', 'AlbumDetailView']

</script>

<template>
    <div id="main-content">
        <router-view v-slot="{ Component }">
            <keep-alive :exclude="excludes" :max="8">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>

</template>

<style>
#main-content {
    display: flex;
    flex: 1;
    /* overflow: auto; */
    /* 这个是可以让整体滑动的关键 */
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    /* 这个是可以让整体滑动的关键 */


}
</style>