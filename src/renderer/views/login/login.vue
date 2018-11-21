<template>
    <div class="loginView backgroundColor drag relative">
        <img class="loginBJ" src="../../img/login_bj.png" alt="">
        <img class="loginClose" src="../../img/login_close.png" @click="loginClose">
        <div class="btnView float-left">
            <div class="btn_login">手机号登录</div>
        </div>
        <div class="btnView float-left">
            <div class="btn_regiest">注册</div>
        </div>
        <div class="thirdPartyLoginView">
            <div>其他登录方式</div>
            <div class="float-left" v-for="(item,index) in thirdParty" :key="index">
                <img :src="item.img" alt="">
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    var ipcRenderer = require('electron').ipcRenderer
    export default {
        data() {
            return {
                thirdParty:[
                    {name: '微信登录', img:'../../img/weChatLogin.png'},
                    {name: 'qq登录', img:'../../img/qqLogin.png'},
                    {name: '微博登录', img:'../../img/sinaLogin.png'},
                    {name: '网易登录', img:'../../img/wyLogin.png'},
                ]
            }
        },
        methods: {
            loginClose() {
                ipcRenderer.send('close-login-window')
            }
        }
    }
</script>