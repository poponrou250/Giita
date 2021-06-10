import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import MyPage from "../views/MyPage.vue"
import Signup from "../views/Signup.vue"
import Signin from "../views/Signin.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/my-page",
    name: "MyPage",
    component: MyPage,
    meta: { requiresAuth: true } //ログインしていないと見られない
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router

// ログイン状態かどうか
import firebase from "firebase"

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // ログイン状態を取得
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        // ログインされていない場合、認証画面へ
        next({ path: "/signin", query: { redirect: to.fullPath } })
      }
    })
  } else {
    next()
  }
})
