<!-- 中间分类图标对应的组件 -->
<script setup>
import { useSquareViewStore } from '../store/squareViewStore';
import { useMainViewStore } from '../store/mainViewStore';
import EventBus from '../../common/EventBus';
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';

const { currentCategoryItem } = storeToRefs(useSquareViewStore())
const { currentCategory, updateCurrentCategoryItem } = useSquareViewStore()
const { hideCategoryView } = useMainViewStore()
const category = reactive([])

const updateCategory = () => {
    category.length = 0
    const cached = currentCategory()
    category.push(...cached)
}

const resetScroll = () => {
    const view = document.querySelector(".category-view")
    view.scrollTop = 0
}

const visitCateItem = (item, row, col) => {
    updateCurrentCategoryItem(item, row, col)
    hideCategoryView()
}

EventBus.on('category-update', ()=> {
    updateCategory()
})

EventBus.on('category-resetScroll', ()=> {
    resetScroll()
})
</script>

<template>
    <div class="category-view" @click.stop="">
        <div class="header">
            <div class="cate-title">当前分类</div>
            <div class="fl-item">{{ currentCategoryItem.data.key }}</div>
        </div>
        <div class="center">
            <div v-for="(cate, row) in category" class="fl-row">
                <div class="cate-title">{{ cate.name }}</div>
                <div>
                    <div v-for="(item, col) in cate.data" 
                        class="fl-item" 
                        :class="{ current : (row == currentCategoryItem.row 
                            && col == currentCategoryItem.col )}"
                        @click="visitCateItem(item, row, col)">
                        {{ item.key }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.category-view {
    overflow: auto;
}

.category-view .header,
.category-view .center {
    display: flex;
    flex-direction: row;
    text-align: left;
}

.category-view .header {
    margin-top: 5px;
    margin-bottom: 5px;
    padding-bottom: 10px;
    padding-left: 25px;
    padding-right: 25px;
    border-bottom: 0.5px solid #555;
}

.category-view .header .cate-title {
    margin-right: 1px;
}

/* 当前分类中的 分类 */
.category-view .header .fl-item {
    cursor: default;
    font-size: 18px;
    /* background: linear-gradient(to top right, #f54ea2, #ff7676); */
    background-color: #fff;
    -webkit-background-clip: text;
    color: transparent;
}

.category-view .center {
    flex-direction: column;
    margin-left: 25px;
    margin-right: 25px;
}

.category-view .fl-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    text-align: left;
}

/* 当前分类中的左侧 文字 */
.category-view .cate-title {
    font-size: 18px;
    font-weight: bold;
    color: #555;
    min-width: 36px;
    margin-top: 15px;
    margin-right: 15px;
}

/* 当前分类中的右侧 文字 */
.category-view .fl-item {
    font-size: 15px;
    padding: 6px 16px;
    margin-top: 10px;
    margin-right: 10px;
    float: left;
    cursor: pointer;
    color: #555;
}


/* 默认后面的全部分类 按钮 */
.category-view .current {
    border-radius: 10rem;
    background: linear-gradient(to top right, #f54ea2, #ff7676);
    color: var(--text-color);
}
</style>