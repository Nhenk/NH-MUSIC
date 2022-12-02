<!-- 可复用的按钮样式 就是 鼠标放在图标上背后浮现出来的button样式 -->
<script setup>
</script>

<template>
    <button class="button-icon">
        <slot></slot>
    </button>
</template>



<style lang="scss" scoped>
    // --color-body-bg: #ffffff;
    // --color-text: #000;
    // --color-primary: #335eea;
    // --color-primary-bg: #eaeffd;
    // --color-secondary: #7a7a7b;
    // --color-secondary-bg: #f5f5f7;
    // --color-navbar-bg: rgba(255, 255, 255, 0.86);
    // --color-primary-bg-for-transparent: rgba(189, 207, 255, 0.28);
    // --color-secondary-bg-for-transparent: rgba(209, 209, 214, 0.28);
    // --html-overflow-y: overlay;

button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background: transparent;
    margin: 4px;
    border-radius: 25%;
    transition: 0.2s;
    border: none;
    $color-secondary-bg-for-transparent: rgba(209, 209, 214, 0.28);
    $color-text: #000;

    .svg-icon {
        color:$color-text;
        height: 16px;
        width: 16px;
    }

    &:first-child {
        margin-left: 0;
    }

    &:hover {
        background: $color-secondary-bg-for-transparent;
    }

    &:active {
        transform: scale(0.92);
    }
}
</style>
