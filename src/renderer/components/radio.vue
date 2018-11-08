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
        <div class="newRadio">
            <div class="personalTitle margin_bottom_20">
                <span class="float-left">推荐节目</span>
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
                catList:[],     //分类列表
            }
        },
        beforeMount() {
            this.getRadioCatList()
        },
        methods: {
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


            catItemDidClick(item) {
                if (item.name === "排行榜") {

                } else if (item.name === "我要做主播") {
                    return ;
                }
                for (let i = 0; i < this.catList.length; i++) {
                    const item = this.catList[i];
                    item.isActived = false;
                }
                item.isActived = true
            }
        }
    }
</script>
