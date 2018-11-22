import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/found/recommend'
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/home').default,
      children : [
        {
          path: '/home/found',
          name: 'found',
          component: () =>  import('../components/found.vue'),
          children: [
            {
              path: '/home/found/recommend',
              name: 'recommend',
              component: () =>  import('../components/recommend.vue')
            },
            {
              path: '/home/found/rankingList',
              name: 'rankingList',
              component: () =>  import('../components/rankingList.vue')
            },
            {
              path: '/home/found/songList',
              name: 'songList',
              component: () =>  import('../components/songList.vue')
            },
            {
              path: '/home/found/radio',
              name: 'radio',
              component: () =>  import('../components/radio.vue')
            },
            {
              path: '/home/found/newestMusic',
              name: 'newestMusic',
              component: () =>  import('../components/newestMusic.vue')
            },
          ]
        }, {
          path: '/home/fm',
          name: 'fm',
          component: () =>  import('../components/fm.vue')
        },
        {
          path: '/home/album',
          name: "album",
          component: () => import('../components/album.vue')
        },
        {
          path: '/home/songListDetail',
          name: "songListDetail",
          component: () => import('../components/songListDetail.vue')
        },

      ]
    },
    {
      path: '/login',
      name: "login",
      component: () => import('../views/login/login.vue'),
      children: [
        {
          path: '/login/mobileLogin',
          name: 'mobileLogin',
          component: () => import('../views/login/mobileLogin.vue')
        },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
