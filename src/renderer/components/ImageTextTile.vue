<!-- 专辑图片 -->
<script setup>
const props = defineProps({
    data: Array,
    cover: String,
    title: String,
    subtitle: String,

    focus: { type: Boolean, default: false },
    coverHover: { type: Boolean, default: true },
    alwaysShowShadow: { type: Boolean, default: false },
})
</script>


<template >
    <div class="image-text-tile">

        <div class="cover-container" @mouseover="focus = true" @mouseleave="focus = false"
            :class="{ 'cover-hover': coverHover }">

            <!-- 专辑列表 -->
            <img class="cover" v-lazy="cover" />
            <!-- 专辑列表 -->

            <!-- 滤镜 -->
            <Transition v-if="coverHover || alwaysShowShadow" name="fade">
                <img class="shadow" v-lazy="cover" v-show="focus" />
            </Transition>
            <!-- 滤镜 -->

        </div>
        <!-- 专辑下面的标题 -->
        <a class="title">{{ title }}</a>
        <!-- 专辑下面的标题 -->
    </div>


</template>

<style scoped lang="scss">
.image-text-tile {
    position: relative;
    margin: 15px 12px;
    transition: transform 0.3s;

    .cover {
        border-radius: 0.75em;
        width: 100%;
        user-select: none;
        aspect-ratio: 1 / 1;
        border: 1px solid rgba(0, 0, 0, 0.04);
    }

    .shadow {
        position: absolute;
        top: 12px;
        width: 100%;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        filter: blur(16px) opacity(0.6);
        transform: scale(0.92, 0.96);
        z-index: -1;
        background-size: cover;
        border-radius: 0.75em;
        aspect-ratio: 1 / 1;
    }

    .cover-hover {
        &:hover {
            cursor: pointer;
        }
    }


    .title {
        display: block;
        margin-top: 10px;
        text-align: left;
        cursor: pointer;
        line-height: 21px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        font-family: Barlow;
        font-weight: 900;
    }
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;

}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>