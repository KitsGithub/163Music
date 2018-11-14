<template>
    <div class="mainWindow songListDetail">
        <div class="header">
            <div class="left float-left">
                <img :src="this.params.picUrl" alt="">
            </div>
            <div class="right">
                <div class="songListName">
                    <span>歌单</span>
                    <h3>{{this.params.name}}</h3>
                </div>
                <div class="creator">
                    <img class="float-left" :src="creator.avatarUrl" alt="">
                    <div class="name float-left">{{creator.nickname}}</div>
                    <div class="createTime float-left">{{createTime}}</div>
                </div>
                <div class="tags">
                    <span class="title float-left">标签:&nbsp;&nbsp;</span>
                    <div class="float-left" v-for="(item,index) in tags" :key="index">
                        <span v-show="index != 0">/</span>
                        <span class="tag">{{item}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="songListView">
            <div class="options">
                <div class="float-left" v-for="(item,index) in optionList" :key="index" :class="{optionActived: item.isActived,marginLeft:index===0}" @click="optionClick(item)">{{item.name}}</div>
            </div>
            <el-table
                :data="songListDate"
                style="width: 100%"
                stripe
                :cell-class-name="cellClass"
            >
                <el-table-column v-for="(item,index) in tableColumns" :key="index"
                    :prop="item.props"
                    :label="item.label"
                    :width="item.width"
                    :highlight-current-row="false"
                >
                </el-table-column>
            </el-table>
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
                params:{},  //传入参数
                picUrl:"",
                name:"",
                createTime:"",
                tags:[],
                creator:{},
                optionList:[
                    { name: "歌曲列表",isActived:true},
                    { name: "评论",isActived:false},
                    { name: "收藏者",isActived:false},
                ],
                tableColumns:[],
                songListDate:[],

            }
        },
        beforeMount() {
            console.log("传入参数"+JSON.stringify(this.$route.query));
            this.params = this.$route.query;

            this.tableColumns = [
                {label:"",props:"index",width:"60"},
                {label:"操作",props:"",width:"50"},
                {label:"音乐标题",props:"name",width:"350"},
                {label:"歌手",props:"ar",width:"150"},
                {label:"专辑",props:"al",width:"200"},
                {label:"时长",props:"time",width:"100"}
            ]

            this.getSongListDetail()
        },
        methods:{
            getSongListDetail() {
                _Api.GET("playlist/detail?id=" + this.params.id,{}, data => {
                    this.creator = data.playlist.creator
                    this.tags = data.playlist.tags;

                    var date = new Date(data.playlist.createTime)
                    this.createTime = date.toLocaleDateString().replace(/\//g, "-") + '创建'

                    this.optionList[1].name = "评论(" + data.playlist.commentCount + ")"

                    for (let i = 0; i < data.playlist.tracks.length; i++) {
                        const song = data.playlist.tracks[i];
                        this.songListDate.push({
                            index: i>8? i+1 : "0"+(i+1),
                            name: song.name,
                            ar: song.ar[0].name,
                            al: song.al.name,
                            time: this.changeToMin(song.dt),
                        })
                    }
                })
            },
            changeToMin(ms) {
                let min = Math.floor((ms/1000/60) << 0);
                let sec = Math.floor((ms/1000) % 60);
                if (sec < 10) {
                    sec = "0" + sec;
                }
                return min + ':' + sec;
            },

            optionClick(item) {
                for (let i = 0; i < this.optionList.length; i++) {
                    const element = this.optionList[i];
                    element.isActived = false;
                }
                item.isActived = true;
            },

            cellClass({row, column, rowIndex, columnIndex}) {
                if (columnIndex == 2) {
                    return "tableCell_songName"
                } else if (columnIndex == 3 || columnIndex == 4) {
                    return "tableCell_songer"
                }
            }
        }
    }
</script>

