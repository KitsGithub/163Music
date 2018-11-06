<template>
    <div class="subWindow backgroundColor relative">
        <div class="rankingListBar">
            <el-button type="text" class="barItem float-left" @click="barItemClick(index)" v-for="(item,index) in menus" :key="index" :class="{margin_left_20 : index === 1,activedStyle: index ===activedIndex}">
                {{item.title}}
            </el-button>
        </div>
        <div class="rankListContainer" v-show="!isGlobelType">
            <div class="listView float-left" v-for="(item,index) in List" :key="index">
                <div class="itemHeader">
                    <img class="bgImg" src="../img/riseList.jpeg" v-show="index === 0">
                    <img class="bgImg" src="../img/newestList.png" v-show="index === 1">
                    <img class="bgImg" src="../img/originalList.jpg" v-show="index === 2">
                    <img class="bgImg" src="../img/hotestList.png" v-show="index === 3">
                    <img class="bgImg" src="../img/electricList.png" v-show="index === 4">
                </div>
                <div class="view">
                    <ul>
                        <li v-for="(listItem,ListIndex) in item.list" :key="ListIndex">
                            <div class="index float-left" :class="{hotColor: ListIndex<3}">{{ ListIndex+1}}</div>
                            <div class="musicName float-left">{{listItem.name}}</div>
                            <div class="author">{{listItem.ar[0].name}}</div>
                        </li>
                    </ul>
                </div>
                <div class="itemFooter">
                    <div>查看全部 ></div>
                </div>
            </div>
        </div>
        <div class="rankListContainer" v-show="isGlobelType">
            <div class="personalItems float-left" v-for="(item,index) in globalList" :key="index">
                <img :src="item.coverImgUrl" alt="">
                <div class="playCount">
                    <span>{{item.playCount}}</span>
                    <img src="../img/Headset.png" alt="">
                </div>
                <!-- <div class="cover" @mouseover="mouseover" @mouseout="mouseout"></div> -->
                <span>{{item.name}}</span>
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
                menus : [
                    {
                        title:"官方榜",
                        isActive: false,
                        rooter:"",
                    },
                    {
                        title:"全球榜",
                        isActive: false,
                        rooter:"",
                    },
                ],
                activedIndex: 0,
                isGlobelType:false,
                List:[      // 官方榜
                    {
                        title:"飙升榜",
                        bgImg:"",
                        list:[],
                    },
                    {
                        title:"新歌榜",
                        bgImg:"../img/newestList.jpeg",
                        list:[],
                    },
                    {
                        title:"原创榜",
                        bgImg:"../img/newestList.jpeg",
                        list:[],
                    },
                    {
                        title:"热歌榜",
                        bgImg:"../img/newestList.jpeg",
                        list:[],
                    },
                    {
                        title:"电音榜",
                        bgImg:"../img/newestList.jpeg",
                        list:[]
                    }
                ],
                globalList:[],  //全球榜

            }
        },
        beforeMount() {

            this.updateList()
            // 获取所有榜单
            this.getAllRankList()
        },
        methods: {
            getListData(idx,cb) {
                _Api.GET("top/list",{idx:idx,limit:8}, response => {
                    cb(response)
                })
            },


            updateList() {
                // 飙升榜
                this.getListData("3",(data)=>{
                    this.List[0].list = data.playlist.tracks;
                })

                // 新歌榜
                this.getListData("0",(data)=>{
                    this.List[1].list = data.playlist.tracks;
                })

                // 原创榜
                this.getListData("2",(data)=>{
                    this.List[2].list = data.playlist.tracks;
                })

                // 热歌榜
                this.getListData("1",(data)=>{
                    this.List[3].list = data.playlist.tracks;
                })

                // 电音榜
                this.getListData("4",(data)=>{
                    this.List[4].list = data.playlist.tracks;
                })
            },

            // 获取所有榜单
            getAllRankList() {
                _Api.GET("toplist/detail",{limit:20}, data=>{
                    console.log(data.list.length);
                    this.globalList = data.list.slice(4,data.list.length);
                    for (let i = 0; i < this.globalList.length; i++) {
                        const item = this.globalList[i];
                        item.playCount = Tools.Calculate(item.playCount)
                    }
                })
            },

            // privied methods
            // 鼠标进入事件
            mouseover(event) {
                let dom = event.target;
                dom.classList.add("hoverStyle")
            },
            // 鼠标退出事件
            mouseout(event) {
                let dom = event.target;
                dom.classList = ["cover"]
            },
            barItemClick(index) {
                this.activedIndex = index
                this.isGlobelType = !this.isGlobelType;
            }
        }
    }
</script>

