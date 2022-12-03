## NH-Music是一款基于Electron + Vue3开发的音乐播放器
### 欢迎喜欢GUI开发的朋友一起学习和交流

#### 开发测试环境
* OS: Windows 10、MacOS(虚拟机) 
* IDE: Visual Studio Code
* 其他: 详见package.json  

#### 主要功能
* 播放器基本功能: 播放/暂停、上/下一首、进度条/播放时间、播放模式、音量控制等  
* 支持音频类型: mp3、flac、ogg、wav、aac、m4a  
* 支持在线音乐平台：酷我音乐 (汗)
* 支持本地歌曲播放  

###界面预览
#### 开发者说
PS：请预先安装好最新版Nodejs  
为保证界面样式，请先检查和安装字体  
macOS字体：STHeitiSC-Medium.ttc  
Windows字体：STHeitiSC-Medium.ttf  

* 初始化项目  
  `npm install`

* 开发模式运行  
  `npm run dev`

* 编译打包  
  `npm run build`  
  `npm run dist`  
  
  注意事项：编译前必须修改 /src/main/main.js 中变量  
  `isDevEnv = false` //是否为开发模式  
  同时，删除编译打包历史目录（2个目录）:  dist、output  

#### 其他
* 目前功能会有不少Bugs，但不影响正常使用  
* 本项目开发为渐进模式，边学习边开发，且本人非专业前端开发者，所以源码无法保证做到高质量
* 项目中很多组件暂时还没封装: 如Tab组件、分页组件等
