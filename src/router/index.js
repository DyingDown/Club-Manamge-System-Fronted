import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import { userInfo } from 'os';
Vue.use(VueRouter)

const routes = []

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/",
            name: "",
            component: () =>
                import ("../views/User.vue"),
            children: [{
                    path: '/profile',
                    component: () =>
                        import ("../views/common/UserInfo.vue")
                },
                {
                    path: '/home',
                    component: () =>
                        import ("../views/common/Dashboard.vue")
                },
                {
                    path: '/message',
                    component: () =>
                        import ("../views/common/Message.vue")
                },
                {
                    path: '/createclub',
                    component: () =>
                        import ("../views/common/CreateClub.vue")
                },
                {
                    path: '/mycreates',
                    component: () =>
                        import ("../views/common/MyCreates.vue")
                },
                {
                    path: '/postmessage',
                    component: () =>
                        import ("../views/common/PostMessage.vue")
                },
                {
                    path: '/postdrafts',
                    component: () =>
                        import ("../views/common/PostDrafts.vue")
                },
                {
                    path: '/clubmessage',
                    component: () =>
                        import ("../views/common/ClubMessage.vue")
                },
                {
                    path: '/manageclub',
                    component: () =>
                        import ("../views/common/ManageClub.vue")
                },
                {
                    path: '/allclubs',
                    component: () =>
                        import ("../views/common/AllClubs.vue")
                },
                {
                    path: '/changepassword',
                    component: () =>
                        import ("../views/common/ChangePW.vue")
                },
                {
                    path: '/clubmanagement',
                    component: () =>
                        import ("../views/common/ClubManagement.vue")
                }
            ]

        }

    ]
})

export default router