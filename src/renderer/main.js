import { createApp } from 'vue';
import App from './App.vue';


//Pinia
import { createPinia } from 'pinia';
//Route
import { router } from './route/Router';
//LazyLoad
import VueLazyLoad from 'vue3-lazyload'
//TODO Player 不能删除!!!
import { Player } from '../common/Player';

// SvgIcon 组件全局注册
import svgIcon from './components/svgIcon.vue'

// 引入全局样式
import '@/assets/css/global.scss';





//Components
import ProgressBar from './components/ProgressBar.vue';
import SliderBar from './components/SliderBar.vue';
import VolumeBar from './components/VolumeBar.vue';
import AudioTime from './components/AudioTime.vue';
import PlayControl from './components/PlayControl.vue';
import ImageTextTile from './components/ImageTextTile.vue';
import SongItem from './components/SongItem.vue';
//Views
import PlayingView from './views/PlayingView.vue';
import PlaybackQueueView from './views/PlaybackQueueView.vue';


const app = createApp(App);

//全局异常处理器
app.config.errorHandler = (err, vm, info) => {
    // 处理错误
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
}

app.use(createPinia())
    .use(router)
    .use(VueLazyLoad, {
        loading: 'default_cover.png',
        error: 'default_cover.png'
    })
    //Components
    .component('SliderBar', SliderBar)
    .component('ProgressBar', ProgressBar)
    .component('VolumeBar', VolumeBar)
    .component('AudioTime', AudioTime)
    .component('PlayControl', PlayControl)
    .component('ImageTextTile', ImageTextTile)
    .component('SongItem', SongItem)
    .component('svg-icon', svgIcon)

    //Views
    .component('PlayingView', PlayingView)
    .component('PlaybackQueueView', PlaybackQueueView)
    .mount('#app')
