<script setup>
import { useRouter } from 'vue-router';
import {reactive, ref} from "vue"
import 'vscode-codicons/dist/codicon.css';
import ButtonIcon from './ButtonIcon.vue';
import WinTrafficLightBtn from '../components/WinTrafficLightBtn.vue';


import { storeToRefs } from 'pinia';
import { usePlatformStore } from '../store/platformStore';

import 'vscode-codicons/dist/codicon.css'


const router = useRouter()

const refresh = () => {
    //router.go(0)
}

// 定义 inputFocus初始值为false
const inputFocus = ref(false)

const backward = () => {
    router.back()
}

const forward = () => {
    router.forward()
}

// 搜索功能
const keywordRef = ref(null)
const hasText = ref(false)
const visitSearchView = () => {
    const data = keywordRef.value.value.trim();
    if(data.length > 0) {
        router.push('/search/' + data)
    }
}
const toggleClearBtn = () => {
    const data = keywordRef.value.value;
    hasText.value = (data && data.length > 0)
}
const clear = () => {
    keywordRef.value.value = ""
    hasText.value = false
}
// 搜索功能




const { platforms, currentPlatformIndex, currentPlatformCode, isLocal } = storeToRefs(usePlatformStore())
const { updateCurrentPlatform } = usePlatformStore()

const updateNavIndex = (index) => {
    updateCurrentPlatform(index)
    const code = currentPlatformCode.value
    const url = isLocal.value ? '/' + code : ('/square/' + code)
    router.push(url)
}


// <!-- 用户注册/登录/显示界面 -->
const User = () => {
    router.push('/user')
}





</script>

<template>
    <div>

        <nav>

            <!-- 顶部的 logo 还有右边的交通灯  -->
            <div class="titleBar">
                <p class="logo">NH-MUSIC</p>
                <div class="titleBarCenter"></div>
                <div class="trafficLightBtn">
                    <WinTrafficLightBtn class="wintrafficlightbtn"></WinTrafficLightBtn>
                </div>
            </div>
            <!-- 顶部的 logo 还有右边的交通灯  -->



            <!-- 左右导航按钮 -->
            <div class="navigation-buttons">
                <button-icon @click="backward">
                    <svg-icon name="arrow-left" />
                </button-icon>
                <button-icon @click="forward">
                    <svg-icon name="arrow-right" />
                </button-icon>
            </div>
            <!-- 左右导航按钮 -->


            <!-- 中间的 音乐库 和 本地音乐 -->
            <div class="navigation-links">
                <div id="platform">
                    <button-icon v-for="(nav, index) in platforms" :class="{ active: currentPlatformIndex == index }"
                        @click="updateNavIndex(index)" class="navigation-links-button-icon">
                        {{ nav.name }}
                    </button-icon>
                </div>
            </div>
            <!-- 中间的 音乐库 和 本地音乐 -->


            <!-- 右边的 搜索栏-->
            <div class="search-bar" @keydown.enter="visitSearchView">
                <div class="search-btn" @click="visitSearchView" :class="{ active: inputFocus }">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-search svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                    <div class="input">
                        <input 
                        type="text" 
                        class="keyword" 
                        :placeholder="inputFocus ? '' : '搜索'" 
                        ref="keywordRef"
                        @input="toggleClearBtn" 
                        @focus="inputFocus = true"
                        @blur="inputFocus = false"
                        />
                    </div>
                    <!-- 搜索框中的 × 清除文字按钮-->
                    <div class="clear-btn">
                        <svg v-show="hasText" @click="clear" width="9" height="9" viewBox="0 0 593.14 593.11" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><path d="M900.38,540.1c-4.44-4.19-8-7.42-11.45-10.83Q783.57,424,678.2,318.63c-13.72-13.69-18.55-29.58-11.75-47.85,10.7-28.71,47.17-36.54,69.58-14.95,18.13,17.45,35.68,35.49,53.47,53.28Q872.75,392.36,956,475.63a47.69,47.69,0,0,1,3.41,4.38c2.07-2,3.5-3.27,4.86-4.63Q1073,366.69,1181.63,258c12.79-12.8,27.71-17.69,45.11-12.36,28.47,8.73,39,43.63,20.49,67a88.49,88.49,0,0,1-6.77,7.34q-107.62,107.65-215.28,215.28c-1.41,1.41-2.94,2.7-4.94,4.53,1.77,1.82,3.2,3.32,4.66,4.79q108.7,108.71,217.39,217.42c15.1,15.11,18.44,35.26,8.88,52.5a42.4,42.4,0,0,1-66.64,10.22c-16.41-15.63-32.17-31.93-48.2-48L963.82,604.19c-1.16-1.16-2.38-2.24-3.83-3.6-1.59,1.52-3,2.84-4.41,4.23Q846.86,713.51,738.15,822.22c-14.56,14.56-33.07,18.24-50.26,10.12a42.61,42.61,0,0,1-14-66.31c1.74-2,3.65-3.89,5.53-5.78Q787.21,652.43,895,544.63C896.44,543.23,898.06,542.06,900.38,540.1Z" transform="translate(-663.4 -243.46)"/></svg>
                    </div>
                    <!-- 搜索框中的 × 清除文字按钮-->
                </div>
            </div>
            <!-- 右边的 搜索栏-->

            <!-- 登录或者注册界面 -->
            <div class="user-btn" @click="User">
                    <img src="../../user.jpg">
            </div>
            <!-- 登录或者注册界面 -->




        </nav>

    </div>
</template>


<style scoped lang="scss">
// --color-body-bg: #ffffff;
//   --color-text: #000;
//   --color-primary: #335eea;
//   --color-primary-bg: #eaeffd;
//   --color-secondary: #7a7a7b;
//   --color-secondary-bg: #f5f5f7;
//   --color-navbar-bg: rgba(255, 255, 255, 0.86);
//   --color-primary-bg-for-transparent: rgba(189, 207, 255, 0.28);
//   --color-secondary-bg-for-transparent: rgba(209, 209, 214, 0.28);
//   --html-overflow-y: overlay;


nav {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    // background-color: pink;

    // height: 64px;
    --color-navbar-bg: rgba(255, 255, 255, 0.86);
    --color-text: #000;
    --color-text: #000;
    --color-secondary-bg-for-transparent: rgba(209, 209, 214, 0.28);
    --color-primary: #335eea;
    --color-primary-bg-for-transparent: rgba(189, 207, 255, 0.28);


    padding: {
        right: 10vw;
        left: 10vw;
    }

    z-index: 100;
    background-color: var(--color-navbar-bg);
    backdrop-filter: saturate(180%) blur(20px);

    .titleBar {
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;


        .logo {
            align-items: center;
            font-weight: bold;
            background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
            color: white;
            background-size: 400%;
            width: 120px;
            height: 32px;
            line-height: 32px;

            &:hover {
                animation: sun 8s infinite;
            }
        }
    }

    @keyframes sun {
        100% {
            background-position: -400% 0;
        }
    }

    .titleBarCenter {
        flex: 10;
        height: 32px;
        align-items: center;
        justify-content: center;
        /* 下面这句是Electron用来拖拽窗口用的，给谁加谁就能拖动 */
        -webkit-app-region: drag;


    }


    .navigation-buttons {
        flex: 1;
        display: flex;
        align-items: center;

        .svg-icon {
            height: 24px;
            width: 24px;
        }
    }


    .navigation-links {
        flex: 1;
        display: flex;
        align-items: center;


        #platform {
            flex: 1;
            display: flex;
            // 下面这句是让文字横过来!
            white-space: nowrap;

            // justify-content: center;


            .navigation-links-button-icon {
                font-size: 18px;
                font-weight: 700;
                border-radius: 6px;
                padding: 6px 10px;
                color: var(--color-text);
                transition: 0.2s;

                margin: {
                    right: 12px;
                    left: 12px;
                }

                &:hover {
                    background: var(--color-secondary-bg-for-transparent);
                }

                &:active {
                    transform: scale(0.92);
                    transition: 0.2s;

                }

            }

            .active {
                color: var(--color-primary);
            }
        }
    }

    // 右边的 搜索栏
    .search-bar {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        
        .search-btn {
            display: flex;
            align-items: center;
            height: 32px;
            background: var(--color-secondary-bg-for-transparent);
            border-radius: 8px;
            width: 200px;
            .svg-search {
                height: 15px;
                width: 15px;
                color: var(--color-text);
                opacity: 0.28;
                margin: {
                    left: 8px;
                    right: 4px;
                        }
                    }
            &:active {
                color: var(--color-primary);
            }

            // 搜索框中 的 ×
            .clear-btn {
                margin-right: 10px;
            }

            
        }

        input {
            font-size: 16px;
            border: none;
            background: transparent;
            width: 96%;
            font-weight: 600;
            margin-top: -1px;
            color: var(--color-text);
        }

        .active {
            background: var(--color-primary-bg-for-transparent);
            .svg-search {
                opacity: 1;
                color: var(--color-primary);
            }
            input {
                opacity: 1;
                outline: none;
                color: var(--color-primary);
            }
        }

        
    }

    .user-btn {

        img {
            height: 30px;
            margin-left: 12px;
            border-radius: 50%;
            cursor: pointer;
            
            &:hover {
                filter: brightness(80%);
                }
        }
    }
}
</style>