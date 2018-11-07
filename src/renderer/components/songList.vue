<template>
    <!-- 歌单 -->
    <div class="subWindow backgroundColor song">
        <el-popover
            placement="bottom-start"
            width="649"
            trigger="click"
            v-model="popoverVisible"
            >
            <div class="popoverView backgroundColor">
                <div class="popoverTop" :v-show="all">
                    <el-button class="listButton">{{all.name}}</el-button>
                </div>
                <div class="popoverLeft float-left">
                    <div class="itemView" v-for="(item,index) in categoryList" :key="index">
                        <div class="item">
                            <i class="el-icon-delete"></i>
                            {{item.name}}
                        </div>
                    </div>
                </div>
                <div class="popoverRight float-left">
                    <div class="tpyeView float-left" v-for="(item,index) in typeList" :key="index">
                        <el-button class="typeButton float-left backgroundColor" @click="closePopover(type.name)" v-for="(type,index2) in typeList[index]" :key="index2" :class="{tagActived: type.name === actived.name}">{{type.name}}</el-button>
                    </div>
                </div>
            </div>
            <el-button class="listButton"  slot="reference" @click="openPopover()">{{actived.name}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
        </el-popover>
        <div class="hotTagView">
            <span>热门标签:</span>
            <el-button v-for="(item,index) in hotTagList" :key="index" class="hotButton">
                {{item.name}}
            </el-button>
        </div>
        <div class="songListView lightgreen">
            <div class="personalItems float-left" v-for="(item,index) in songList" :key="index">
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
                popoverVisible:false,   //popover控制位

                hotTagList:[],          //热门标签
                categoryList:[],        //分类列表
                typeList:[],            //类别数据源
                all:NaN,
                actived:{name:"华语"},  //当前激活tag

                // 歌单数据
                songList:[],            //歌单列表
            }
        },
        beforeMount() {
            this.getAllCategory()
            this.getHotCategory()
            this.getSongList("华语")
        },
        methods: {
            getHotCategory() {
                _Api.GET("playlist/hot",{}, data=> {
                    this.hotTagList = data.tags
                })
            },
            getAllCategory() {
                _Api.GET("playlist/catlist",{}, data=>{
                    // this.category = data;
                    console.log(data.categories);

                    this.all = data.all

                    // 左侧数据源
                    let array = []
                    for (const i in data.categories) {
                        if (data.categories.hasOwnProperty(i)) {
                            const element = data.categories[i];
                            array.push({
                                idx:parseInt(i),
                                name:element
                            })
                        }
                    }
                    this.categoryList = array;

                    // 右侧数据源
                    let typeList = []
                    for (let i = 0; i < this.categoryList.length; i++) {
                        // debugger
                        const category = this.categoryList[i];
                        let TypeArray = []
                        for (let j = 0; j < data.sub.length; j++) {
                            const sub = data.sub[j];
                            if (sub.category === category.idx) {
                                TypeArray.push(sub)
                            }
                        }
                        if (TypeArray.length) {
                            typeList.push(TypeArray)
                        }
                    }
                    this.typeList = typeList;


                })
            },

            getSongList(cat) {
                if (!cat.length) {
                    return
                }
                // http://localhost:3000/top/playlist?limit=10&cat=%E5%8D%8E%E8%AF%AD
                _Api.GET("top/playlist?cat=" + cat,{}, data => {
                    this.songList = data.playlists

                    for (let i = 0; i < this.songList.length; i++) {
                        const item = this.songList[i];
                        item.playCount = Tools.Calculate(item.playCount)
                    }
                })
            },

            // 用户操作
            openPopover() {
                this.popoverVisible = true;
            },
            closePopover(name) {
                this.actived.name = name
                this.getSongList(name)
                this.popoverVisible = false;
            }
        }
    }
</script>
