import { defineStore } from 'pinia';
import { KuWo } from '../../vendor/kuwo';
import { LocalMusic } from '../../vendor/localmusic';

//音乐平台
const platforms = [
    { 
        code: KuWo.CODE,
        name: '首页',
        online: true
    }, 
    // { 
    //     code: Found.CODE,
    //     name: '发现',
    //     online: true
    // },
    { 
        code: LocalMusic.CODE,
        name: '本地歌曲',
        online: true
    },
]

// slice英语上有切片的含义
// slice(start,end) : 方法可以从已有数组中放回选定的元素，放回一个新数组，包含start到end(不包含该元素)的数组元素
// start参数：必选，规定从何处开始选取，如果为负数，规定从数组末尾算起的位置，-1是指定最后一个元素
// end参数：可选，(如果该参数没有指定，那么切分的数组包含从satrt的倒数组结束的所有元素，如果这个参数为负数，那么规定是从数组尾部开始算起的元素)

// splice英语上译为拼接
// splice该方法向或者从 数组中添加或者删除项目，返回被删除的项目(注意该方法会改变原数组)
// splice(index,howmany,item1,...itemX)
// index参数：必选，整数，规定添加或者删除的位置，使用负数，从数组尾部规定位置
// howmany参数：必选，要删除的数目，如果为0,则不删除项目
// item1,...itemX参数：可选，向数组中添加的新项目

const navPlatforms = platforms.slice(0)
const onlinePlatformFilter = platforms.slice(0, platforms.length)

const venders = {
    kuwo: KuWo,
    local: LocalMusic
}

//平台相关Store
export const usePlatformStore = defineStore('platform', {
    //State
    state: () => ({
        currentPlatformIndex: 0,
        venders
    }),
    //Getters 模块 类似于计算属性，是有缓存的，只要是帮助我们修饰一些值
    getters: {
        platforms() {
            return navPlatforms
        },
        currentPlatform(state) {
            return state.platforms[state.currentPlatformIndex]
        },
        currentPlatformCode(state) {
            return state.currentPlatform ? state.currentPlatform.code : ''
        },
        onlinePlatformsFilter() {
            return onlinePlatformFilter
        },
        isLocal(state) {
            return state.currentPlatformIndex == platforms.length - 1;
        }
    }, 
    //Actions 类似于 methods，帮助我们做一些同步的或者是异步的操作，提交 state 之类的
    actions: {
        updateCurrentPlatform(index) {
            this.currentPlatformIndex = index
        },
        updateCurrentPlatformByCode(code) {
            if(!code || code.trim().length < 1) {
                this.updateCurrentPlatform(-1)
                return
            }
            for(var i = 0; i < this.platforms.length; i++) {
                if(code === this.platforms[i].code) {
                    this.updateCurrentPlatform(i)
                    break
                }
            }
        },
        getVender(name) {
            name = name.toLowerCase().trim()
            return this.venders[name]
        },
        currentVender() {
            return this.getVender(this.currentPlatformCode)
        },
        isKuWo(platform) {
            return this.isPlatformValid(platform) && platform.trim() == KuWo.CODE
        },
        isPlatformValid(platform) {
            return platform && platform.trim().length >  0
        }
    }
})