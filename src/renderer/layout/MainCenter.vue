<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';
import MainContent from './MainContent.vue';
import { useMainViewStore } from '../store/mainViewStore'
import CategoryView from '../views/CategoryView.vue';
import MainBottom from './MainBottom.vue';
import Navbar from '../components/Navbar.vue';




const { categoryViewShow } = storeToRefs(useMainViewStore())
const { hideCategoryView, hidePlaybackQueueView } = useMainViewStore()

onMounted(() => {
    window.addEventListener('resize', e => {
        bindCategoryHeight()
    })

    document.addEventListener('click', e => {
        //隐藏当前播放列表
        hidePlaybackQueueView()
        //隐藏全部分类
        hideCategoryView()
    })

    const bindCategoryHeight = () => {
        const mainContent = document.getElementById('main-content')
        const categoryView = document.getElementById('category-view')
        categoryView.style.height = (mainContent.clientHeight - 37) + "px"
    }

    // bindCategoryHeight()
})
</script>

<template>
    <div id="main-center">
        <Navbar></Navbar>
        <MainContent id="main-content"></MainContent>
        <MainBottom></MainBottom>

        <!-- <transition name="fade-ex">
            <CategoryView id="category-view" v-show="categoryViewShow"></CategoryView>
        </transition> -->

        <!-- <div id="Bottom"></div> -->
    </div>
</template>

<style>

</style>