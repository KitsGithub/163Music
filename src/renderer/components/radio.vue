<template>
    <div class="subWindow backgroundColor radio">
        <div class="radioCatListView">
            <div class="item float-left" v-for="(item,index) in catList" :key="index" @click="catItemDidClick(item)">
                <div class="catImg" :style="{background : 'url('+ item.picMacUrl +')'}" :class="{active : item.isActived}"></div>
                <div class="catTitle" :class="{themeTextColor : index ===0,blueTextColor:index === catList.length-1,active : item.isActived}">
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="newRadio" v-show="!currentRadioCat">
            <div class="personalTitle margin_bottom_20">
                <span class="float-left">推荐节目</span>
            </div>
            <div class="itemContainer">
                <div class="item float-left" v-for="(item,index) in programsList" :key="index">
                    <img class="itemImg float-left" :src="item.coverUrl">
                    <div class="itemTitle float-left">
                        <h4>{{item.name}}</h4>
                        <span>{{item.reason}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="hotRadio">
            <div class="personalTitle margin_bottom_20">
                <span class="float-left" v-if="!currentRadioCat">热门电台</span>
                <span class="float-left" v-else>优秀新电台</span>
            </div>
            <div class="itemContainer">
                <div class="item float-left" v-for="(item,index) in programsList" :key="index">

                </div>
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
                catList:[],             //分类列表
                programsList:[],       //推荐电台
                currentRadioCat:null,    //当前选中类别

            }
        },
        beforeMount() {
            this.getRadioCatList()
            this.getRecommendRadio()
        },
        methods: {
            // 获取电台分类
            getRadioCatList() {
                _Api.GET("dj/catelist",{}, data => {
                    let catList = data.categories;
                    let fistItem = {
                        name : "排行榜",
                        picMacUrl: "",
                    }
                    let lastItem = {
                        name : "我要做主播",
                        picMacUrl: ""
                    }
                    catList.splice(0,0,fistItem)
                    catList.push(lastItem)

                    for (let i = 0; i < catList.length; i++) {
                        const item = catList[i];
                        item.isActived = false;
                    }
                    this.catList = catList;
                })
            },

            // 获取推荐节目
            getRecommendRadio() {
                _Api.GET("program/recommend?limit=4",{}, data => {
                    this.programsList = data.programs
                })
            },

            catItemDidClick(item) {
                if (item.name === "排行榜") {

                } else if (item.name === "我要做主播") {
                    return ;
                }

                for (let i = 0; i < this.catList.length; i++) {
                    const item = this.catList[i];
                    item.isActived = false;
                }
                this.currentRadioCat = item.name
                item.isActived = true
            }
        }
    }
</script>
