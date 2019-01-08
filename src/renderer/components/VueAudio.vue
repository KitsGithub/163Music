<template>
  <div class="di" v-loading="audio.waiting">
    <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
    <audio ref="audio" class="dn"
    :src="url" :preload="audio.preload"
    @play="onPlay"
    @error="onError"
    @waiting="onWaiting"
    @pause="onPause"
    @timeupdate="onTimeupdate"
    @loadedmetadata="onLoadedmetadata"
    autoplay="autoplay"
    @ended="endPlay"
    ></audio>
    <div class="audio_container">
      <!-- <el-button type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button> -->
      <img class="optionButton" src="../img/prevButton.jpeg" alt="">
      <!-- <el-button type="text" > -->
        <img class="playButton" src="../img/stopButton.jpeg" @click="startPlayOrPause" v-show="audio.playing">
        <img class="playButton" src="../img/playButton.jpeg" @click="startPlayOrPause" v-show="!audio.playing">
      <!-- </el-button> -->

      <img class="optionButton" src="../img/nextButton.jpeg" alt="">
      <el-slider
        class="slider"
        v-model="sliderTime"
        :format-tooltip="formatProcessToolTip"
        @change="changeCurrentTime">
      </el-slider>
      <!-- <el-tag type="info">{{ audio.currentTime | formatSecond}}</el-tag> -->
      <div class="time_container">
        <span>{{ audio.currentTime | formatSecond}}</span>
        <span>/</span>
        <span>{{ audio.maxTime | formatSecond}}</span>
      </div>
      <div class="volume_container">
        <img src="../img/volume.png" v-show="volume">
        <img src="../img/volume_stop.png" v-show="volume === 0">
        <el-slider
          class="volumeSlider"
          v-model="volume"
          :format-tooltip="formatVolumeToolTip"
          @change="changeVolume">
        </el-slider>
      </div>
      <div class="other_container"></div>
    </div>
  </div>
</template>

<script>
  function realFormatSecond(second) {
    var secondType = typeof second
    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)
      second = parseInt(second)

      var hours = Math.floor(second / 3600)
      second = second - hours * 3600
      var mimute = Math.floor(second / 60)
      second = second - mimute * 60

      return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
      return '0:00'
    }
  }

  export default {
    props: {
      music: {
        type: Array,
        default () {
          return []
        }
      },
      theSpeeds: {
        type: Array,
        default () {
          return [1, 1.5, 2]
        }
      },
      theControlList: {
        type: String,
        default: ''
      }
    },
    name: 'VueAudio',
    data() {
      return {
        url: "",
        currentIndex:0,
        audio: {
          currentTime: 0,
          maxTime: 0,
          playing: false,
          muted: false,
          speed: 1,
          waiting: false,
          preload: 'auto'
        },

        sliderTime: 0,
        volume: 80,
        speeds: this.theSpeeds,

        controlList: {
          // 不显示下载
          noDownload: false,
          // 不显示静音
          noMuted: false,
          // 不显示音量条
          noVolume: false,
          // 不显示进度条
          noProcess: false,
          // 只能播放一个
          onlyOnePlaying: false,
          // 不要快进按钮
          noSpeed: false
        }
      }
    },
    beforeMount() {
      if (this.music.length) {
        this.currentIndex = 0
        this.url = this.music[this.currentIndex].url
      }

    },
    watch: {
      music() {
        this.currentIndex = 0
        this.url = this.music[this.currentIndex].url
      }
    },
    methods: {
      setControlList () {
        let controlList = this.theControlList.split(' ')
        controlList.forEach((item) => {
          if(this.controlList[item] !== undefined){
            this.controlList[item] = true
          }
        })
      },

      // 音量条toolTip
      formatVolumeToolTip(index) {
        return index
      },
      // 进度条toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      // 音量改变
      changeVolume(index = 0) {
        this.$refs.audio.volume = index / 100
        this.volume = index
      },
      // 播放跳转
      changeCurrentTime(index) {
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      },
      startPlayOrPause() {
        return this.audio.playing ? this.pausePlay() : this.startPlay()
      },
      // 开始播放
      startPlay() {
        this.$refs.audio.play()
      },
      // 暂停
      pausePlay() {
        this.$refs.audio.pause()
      },
      // 当音频暂停
      onPause () {
        this.audio.playing = false
      },
      // 当发生错误, 就出现loading状态
      onError () {
        // this.audio.waiting = true
      },
      // 当音频开始等待
      onWaiting (res) {
        console.log(res)
      },
      // 当音频开始播放
      onPlay (res) {
        console.log(res)
        this.audio.playing = true
        this.audio.loading = false

        if(!this.controlList.onlyOnePlaying){
          return
        }

        let target = res.target

        let audios = document.getElementsByTagName('audio');

        [...audios].forEach((item) => {
          if(item !== target){
            item.pause()
          }
        })
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {
        // console.log('timeupdate')
        // console.log(res)
        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之类的数据
      onLoadedmetadata(res) {
        console.log('loadedmetadata')
        console.log(res)
        this.audio.waiting = false
        this.audio.maxTime = parseInt(res.target.duration)
      },
      // 播放结束
      endPlay() {
        console.log('播放结束--播放下一首');

        if (this.music.length) {
          if (this.currentIndex === (this.music.length -1)) {
            return
          }
          this.currentIndex++;
          this.url = this.music[this.currentIndex].url
        }


      }
    },
    filters: {
      formatSecond(second = 0) {
        return realFormatSecond(second)
      },
      transPlayPause(value) {
        return value ? '暂停' : '播放'
      },
      transMutedOrNot(value) {
        return value ? '放音' : '静音'
      },
    },
    created() {
      this.setControlList()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .audio_container {
    background-color: #f0f0f0;
    width: 100%;
    height: 100%;
  }


  .audio_container .optionButton {
    width: 34px;
    height: 34px;
    background-size: 34px 34px;
    margin-left: 23px;
    margin-top: 15px;
  }

  .audio_container .playButton {
    width: 38px;
    height: 38px;
    background-size: 38px 38px;
    padding-left: 23px;
    margin-top: 13px;
  }

  .audio_container .time_container {
    display: inline-block;
    margin-left: 10px;
    top: 21px;
    position: absolute;
  }
  .audio_container .time_container>span {
    font-size: 11px;
    color: #888888;
  }

  .slider {
    display: inline-block;
    width: 400px;
    position: relative;
    /* top: 14px; */
    margin-left: 30px;
  }

  .audio_container .volume_container {
    display: inline-block;
    margin-left: 120px;
    position: relative;
  }
  .audio_container .volume_container>img {
    width: 20px;
    height: 20px;
    background-color: 20px 20px;
    position: absolute;
    top: 8px;
  }
  .audio_container .volume_container>.volumeSlider {
    display: inline-block;
    width: 97px;
    position: relative;
    margin-left: 30px;
  }

  .di {
    height: 65px;
    width: 100%;
  }


  .dn{
    display: none;

  }

</style>
