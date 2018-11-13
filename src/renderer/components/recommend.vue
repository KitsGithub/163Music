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
            <div class="personalItems float-left" @click="personalItemClick(item)" v-for="(item,index) in personalizedList" :key="index" :class="{moreTopMargin : index>=4, margin_left_0 : (index === 0 || index === 4)}">
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
        <div class="personalized recommendation margin_top_40">
            <div class="personalTitle margin_bottom_20">
                <span class="float-left">个性化推荐</span>
                <h4 class="float-left">根据你的口味生成，播放和收藏越多，推荐越准</h4>
            </div>
            <div class="recommendationItems float-left" v-for="(item,index) in recommendationList" :key="index" :class="{borderBottom: index === 0 || index === 1 ,borderRight:index === 0 || index === 2}">
                <div v-if="index === 0">
                    <div class="recommendationImg float-left"></div>
                    <div class="float-left">
                        <h3>每日推荐</h3>
                        <h4>根据你的口味生成，每日更新！</h4>
                    </div>
                </div>
                <div v-else>
                    <div class="recommendationImg float-left" :class="{margin_left_20:index === 1 || index === 3}">
                        <img :src="item.picUrl" alt="">
                        <div class="playCount">
                            <span>{{item.playCount}}</span>
                            <img src="../img/Headset.png" alt="">
                        </div>
                    </div>
                    <div class="recommendationTitle float-left">
                        <h3>{{item.name}}</h3>
                        <h4>{{item.copywriter}}</h4>
                    </div>
                </div>
                <div class="cover" @mouseover="mouseover" @mouseout="mouseout"></div>
            </div>
        </div>
        <div class="songList_container">
            <div class="personalTitle">
                <span class="float-left">新歌速递</span>
                <button class="more_button">更多 ></button>
            </div>
            <div class="songList">
                <div class="songBar">
                    <img class="palyAllImg" src="../img/MiniPlayerPlayButton.png" alt="">
                    <el-button class="palyAll" type="text">播放全部</el-button>
                </div>
                <ul>
                    <li v-for="(item,key) in newSongList" :key="key" @mouseover="_listMouseover" @mouseout="_listMouseout">
                        <div class="num float-left">{{ (key+1) >= 10 ? key+1 : '0' + (key+1)}}</div>
                        <div class="title float-left">{{item.name}}</div>
                        <div class="subTitle float-left" v-if="item.alias.length">{{item.alias[0]}}</div>
                        <div class="artists">{{item.album.artists[0].name}}</div>
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
                recommendationList:[],  //个性化推荐
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

                                if (i === 0 || i === 2 || i === 4 || i === 6) {
                                    this.recommendationList.push(item)
                                }
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


            // item 的点击事件
            personalItemClick(item) {
                console.log("item点击了");
                this.$router.push("/home/album")
            },

            // 鼠标进入事件
            mouseover(event) {
                let dom = event.target;
                dom.classList.add("hoverStyle")
            },

            _listMouseover(event) {
                // console.log(event);
                let dom
                if (event.target.localName === "li") {
                    dom = event.target;
                } else {
                    dom = event.target.parentElement;
                }

                if (dom.lastChild.id === "listHover" || dom.lastChild.id != "") {
                    return
                }
                let div = document.createElement("div")
                dom.appendChild(div)
                div.id = "listHover"
                div.className = "listHover"
            },

            // 鼠标退出事件
            mouseout(event) {
                let dom = event.target;
                dom.classList = ["cover"]
            },
            _listMouseout(event) {
                // console.log("------- 鼠标移除");
                let dom
                if (event.target.localName === "li") {
                    dom = event.target;
                } else {
                    dom = event.target.parentElement;
                }
                dom.removeChild(dom.lastChild)

            },
        }
    }
</script>

