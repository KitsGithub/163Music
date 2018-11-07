<template>
    <!-- 歌单 -->
    <div class="subWindow backgroundColor">
        <el-popover
            placement="bottom-start"
            width="649"
            trigger="click">
            <div class="popoverView">
                <div class="popoverTop">
                    <el-button class="listButton">全部风格</el-button>
                </div>
                <div class="popoverLeft float-left">
                    <div v-for="(item,index) in songTypeList"  :key="index">
                        {{item.name}}
                    </div>
                </div>
                <div class="popoverRight float-left">

                </div>
            </div>
            <el-button class="listButton"  slot="reference">欧美<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
        </el-popover>
        <div class="hotTagView">
            <span>热门标签:</span>
            <el-button v-for="(item,index) in hotTagList" :key="index" class="hotButton">
                {{item.name}}
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                hotTagList:[
                    {
                        name:"华语",
                        idx:"",
                    },
                    {
                        name:"流行",
                        idx:"",
                    },
                    {
                        name:"摇滚",
                        idx:"",
                    },
                    {
                        name:"民谣",
                        idx:"",
                    },
                    {
                        name:"电子",
                        idx:"",
                    },
                    {
                        name:"轻音乐",
                        idx:"",
                    },
                    {
                        name:"影视原声",
                        idx:"",
                    },
                    {
                        name:"ACG",
                        idx:"",
                    },
                    {
                        name:"怀念",
                        idx:"",
                    },
                    {
                        name:"治愈",
                        idx:"",
                    }
                ],
                songTypeList:[
                    {name:'语种'},
                    {name:'风格'},
                    {name:'场景'},
                    {name:'情感'},
                    {name:'主题'}
                ],
            }
        }
    }
</script>
