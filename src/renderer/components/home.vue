<template>
  <div id="wapper">
    <div id="funtion-bar" class="funtion-bar themeColor">
      <div class="systemFuntion">
        <i class="funtion-btn no-drag close" @click="closeWindow"></i>
        <i class="funtion-btn no-drag minimal" @click="minimalWindow"></i>
        <i class="funtion-btn no-drag fullscreen" @click="fullscreenWindow"></i>
      </div>
      <div>
        <div class="wyy wyyIcon float-left"></div>
      </div>
    </div>
    <div class="left-side-container float-left">
      <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect">
        <el-menu-item-group v-for="(item,key) in menus" :key="key">
          <template slot="title">{{item.title}}</template>
          <el-menu-item v-for="(subItem,key) in item.subMenus" :key="key" :index="subItem.index">
            <i class="el-icon-menu"></i>
            <span>{{subItem.subTitle}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </div>
    <div class="right-side-container float-left">
      <router-view></router-view>
    </div>
    <div class="footer-container float-left">

    </div>
  </div>
</template>

<script>

	var ipcRenderer = require('electron').ipcRenderer
  	export default {
    	name: 'home',
		components: {},
		data() {
			return {
        menus:[
          {
            title:"推荐",
            subMenus:[{
              subTitle:"发现音乐",
              index:"find"
            },{
              subTitle:"私人FM",
              index:"fm"
            },{
              subTitle:"MV",
              index:"mv"
            },{
              subTitle:"朋友",
              index:"friends"
            }]
          },{
            title:"我的音乐",
            subMenus:[{
              subTitle:"iTnues音乐",
              index:"iTnues"
            },{
              subTitle:"下载的音乐",
              index:"download"
            }]
          },{
            title:"创建的歌单",
            subMenus:[{
              subTitle:"我喜欢的音乐",
              index:"myFaver"
            }]
          },{
            title:"收藏的歌单",
            subMenus:[]
          }
        ]
			}
		},
    methods: {
      //打开外部链接
			open (link) {
				this.$electron.shell.openExternal(link)
      },

      // 关闭窗口
			closeWindow() {
				console.log("点击了关闭");
				ipcRenderer.send('window-all-closed')
      },

      // 最小化窗口
			minimalWindow() {
        console.log("点击了最小化");
        ipcRenderer.send('hide-window')
      },

      // 最大化窗口
			fullscreenWindow() {
        console.log("点击了最大化");
        ipcRenderer.send('show-window')
      },

      handleSelect(key, keyPath) {
        if (key === "find") {
          this.$router.push("/home/found");
        } else if (key === "fm") {
          this.$router.push("/home/fm");
        }
      }
		}
	}
</script>

<style>

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.title {
  color: lightsalmon;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: white;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid white;
}

.doc button.alt {
  color: white;
  background-color: transparent;
}
</style>
