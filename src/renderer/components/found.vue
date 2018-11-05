<template>
    <div class="mainWindow">
        <div class="tabs">
            <div class="tabsContainer">
                <div class="tabs_items float-left" v-for="(item,index) in menus" :key="index" @click="tabClick(index)" :class="{tabsActive : item.isActive, tabsMargin : index != 0}">
                    <span>{{item.title}}</span>
                </div>
            </div>

        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name:"found",
        data() {
            return {
                menus : [
                    {
                        title:"推荐",
                        isActive: true,
                        rooter:"/home/found/recommend",
                    },
                    {
                        title:"排行榜",
                        isActive: false,
                        rooter:"/home/found/rankingList",
                    },
                    {
                        title:"歌单",
                        isActive: false,
                        rooter:"/home/found/songList",
                    },
                    {
                        title:"主播电台",
                        isActive: false,
                        rooter:"/home/found/radio",
                    },
                    {
                        title:"最新音乐",
                        isActive: false,
                        rooter:"/home/found/newestMusic",
                    },
                ]
            }
        },
        methods: {
            tabClick(index) {
                for (let i = 0; i < this.menus.length; i++) {
                    const tabItem = this.menus[i];
                    tabItem.isActive = false
                }
                this.menus[index].isActive = true;
                this.$router.push(this.menus[index].rooter);
            }
        }
    }
</script>
