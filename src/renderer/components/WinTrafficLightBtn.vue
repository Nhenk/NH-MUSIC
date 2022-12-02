<script setup>
import { useMainViewStore } from '../store/mainViewStore';
const { quit, minimize, maximize } = useMainViewStore()
</script>

<template>
    <!-- icons by https://github.com/microsoft/vscode-codicons -->
    <!-- icon 引入在父组件中 -->
    <!-- codicon codicon- 为图标引入固定写法 -->
    <div class="win-traffic-light-btn">
        <div @click="minimize" class="button minimize codicon codicon-chrome-minimize"></div>
        <div @click="maximize" class="button maximize codicon codicon-chrome-maximize"></div>
        <div @click="quit" class="button quit codicon codicon-chrome-close"></div>
    </div>
</template>

<style lang="scss" scoped>
.win-traffic-light-btn {
    display: flex;
    width: 138px;
    $hover: #e6e6e6;
    $active: #cccccc;
    .button {
        display: flex;
        justify-content: flex-end;
        margin-left: auto;
        height: 32px;
        &:hover {
            background: $hover;
        }
        &:active {
            background: $active;
        }
    }
    .minimize {
        flex: 1;
        font-size: 16px;
        justify-content: center;
        align-items: center;
    }
    .maximize {
        flex: 1;
        font-size: 16px;
        justify-content: center;
        align-items: center;
    }
    .quit {
        flex: 1;
        font-size: 16px;
        justify-content: center;
        align-items: center;
        &:hover {
            background: #c42c1b;
            color: rgba(255, 255, 255, 0.8);
        }
        &:active {
            background: #f1707a;
            color: #000;
        }
    }
}
</style>