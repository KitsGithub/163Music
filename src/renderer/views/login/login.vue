<template>
    <div>
        <div class="loginView backgroundColor drag relative" v-show="statues===''">
            <img class="loginBJ" src="../../img/login_bj.png" alt="">
            <img class="loginClose" src="../../img/login_close.png" @click="loginClose">
            <div class="btnView float-left no-drag">
                <div class="btn_login" @click="selfphoneLogin">手机号登录</div>
            </div>
            <div class="btnView float-left no-drag">
                <div class="btn_regiest" @click="regiest">注册</div>
            </div>
            <div class="thirdPartyLoginView no-drag">
                <div class="thirdPartyTitle">
                    <div class="line1 float-left"></div>
                    <span class="loginTitle float-left">其他登录方式</span>
                    <div class="line2 float-left"></div>
                </div>
                <div class="float-left item" style="margin-left:50px;">
                    <img src="../../img/weChatLogin.png" alt="">
                    <div>微信</div>
                </div>
                <div class="float-left item">
                    <img src="../../img/qqLogin.png" alt="">
                    <div>qq</div>
                </div>
                <div class="float-left item">
                    <img src="../../img/sinaLogin.png" alt="">
                    <div>新浪微博</div>
                </div>
                <div class="float-left item">
                    <img src="../../img/wyLogin.png" alt="">
                    <div>网易邮箱</div>
                </div>
            </div>
        </div>
        <div class="loginView backgroundColor drag relative" v-show="statues==='login'">
            <img class="loginBJ" src="../../img/mobile_login_bj.png" alt="">
            <img class="loginClose" src="../../img/login_close.png" @click="loginClose">
            <div class="backButton" @click="back">返回其他登录</div>
            <div class="login_input_c">
                <div class="phone">
                    <img class="float-left" src="../../img/login_phone.png" alt="">
                    <span class="float-left">+86</span>
                    <el-input class="float-left" type="text"></el-input>
                </div>
                <div class="password">
                    <img src="../../img/login_password.png" alt="">
                </div>
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
                ],
                statues:"",
            }
        },
        methods: {
            loginClose() {
                ipcRenderer.send('close-login-window')
            },

            // 登录
            selfphoneLogin() {
                console.log('点击登录');
                this.statues = 'login'

            },

            // 注册
            regiest() {
                console.log('点击注册');
            },

            back() {
                this.statues = ''
            },
        }
    }
</script>