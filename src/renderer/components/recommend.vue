<template>
    <!-- 推荐 -->
    <div class="subWindow backgroundColor">
        <div class="bannerContainer">
            <el-carousel type="card" height="170px" arrow="nerver" :autoplay="false">
                <el-carousel-item v-for="(item,index) in banners" :key="index">
                    <div class="relative">
                        <img class="banner" :src="item.imageUrl">
                        <div class="bannerSpan">
                            <span>{{item.typeTitle}}</span>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="personalized">
            <div class="personalTitle">
                <span>热门精选</span>
            </div>
            <div class="personalItems float-left" v-for="(item,index) in personalizedList" :key="index" :class="{moreTopMargin : index>=4, margin_left_0 : (index === 0 || index === 4)}">
                <img :src="item.picUrl" alt="">
                <div class="playCount">
                    <span>{{item.playCount}}</span>
                    <img src="../img/Headset.png" alt="">
                </div>
                <div class="cover" @mouseover="mouseover" @mouseout="mouseout"></div>
                <span>{{item.name}}</span>
            </div>
        </div>
        <!-- 个性化推荐 -->
        <div class="personalized margin_top_40">
            <div class="personalTitle">
                <span class="float-left">个性化推荐</span>
                <h4 class="float-left">根据你的口味生成，播放和收藏越多，推荐越准</h4>
            </div>
            <div class="personalItems float-left" v-for="(item,index) in personalizedList" :key="index" :class="{moreTopMargin : index>=4, margin_left_0 : (index === 0 || index === 4)}">
                <img :src="item.picUrl" alt="">
                <div class="playCount">
                    <span>{{item.playCount}}</span>
                    <img src="../img/Headset.png" alt="">
                </div>
                <div class="cover" @mouseover="mouseover" @mouseout="mouseout"></div>
                <span>{{item.name}}</span>
            </div>
        </div>
        <div class="songList_container">
            <div class="personalTitle">
                <span class="float-left">新歌速递</span>
                <button class="more_button">更多 ></button>
            </div>
            <div class="songList">
                <div class="songBar">
                    <span>播放全部</span>
                </div>
                <ul>
                    <li v-for="(item,key) in newSongList" :key="key">
                        <span>{{ (key+1) >= 10 ? key+1 : '0' + (key+1)}}</span>
                        <span >{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import _Api from '../api/api.js'
import Tools from '../public/tools.js'
import { debug } from 'util';
    export default {
        data() {
            return {
                banners:[],             //banner
                personalizedList:[],    //热门精选
                newSongList:[],         //新歌速递

            }
        },
        beforeMount() {
            this.getBannerData()
            this.getPersonalized()
            this.getPersonalSongs()
        },
        methods :{
            getBannerData() {
                _Api.POST("banner",{},
                    response => {
                        this.banners = response.banners;
                    })
            },
            getPersonalized() {
                _Api.POST("personalized",{},
                    response =>{
                        if (response.code === 200) {
                            this.personalizedList = response.result.slice(0,8)
                            for (let i = 0; i < this.personalizedList.length; i++) {
                                const item = this.personalizedList[i];
                                item.playCount = Tools.Calculate(item.playCount)
                            }
                        }

                    })
            },

            // 获取新歌速递
            getPersonalSongs() {
                _Api.POST("top/song",{type:0,limit:20},
                    response => {
                        this.newSongList = response.data.slice(0,20);
                    })
            },

            // 鼠标进入事件
            mouseover(event) {
                let dom = event.target;
                dom.classList.add("hoverStyle")
            },
            mouseout(event) {
                let dom = event.target;
                dom.classList = ["cover"]
            },
        }
    }
</script>

