import Vue from "vue"
import firebase from "firebase"
import "firebase/firestore"
// import store from "./store"

// Vue.use(Vuetify, {
//   iconfont: "md",
// })
// Vue.config.productionTip = false
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCsdDNSOnwk50vCoPJUtSRcp9yIKSzcWv0",
  authDomain: "giita-f0038.firebaseapp.com",
  projectId: "giita-f0038",
  storageBucket: "giita-f0038.appspot.com",
  messagingSenderId: "700188734267",
  appId: "1:700188734267:web:0b39d2eabff55704483d1e",
  measurementId: "G-97ER9KJGQ8",
}

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
export const storage = firebase.storage()

/**
 * Vue.observable を使って、firebase.auth()をVueアプリ全体に共有する。
 * this.$authがアプリ全体でアクセスできる様になる。
 * example
 * firebase.auth().currentUser.displayにアクセスする例。任意のコンポーネントで以下の様に記述できる。
 * ```js
 * this.$auth.currentUser.displayName // "displayName" or ""
 * ```
 */

const initialUserState = {
  uid: "",
  displayName: "ゲスト",
  photoURL: "",
}
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
})
firebase.auth().onAuthStateChanged((user) => {
  let state
  if (user) {
    const { uid, displayName, photoURL } = user
    state = {
      uid,
      displayName,
      photoURL,
    }
  } else {
    state = initialUserState
  }
  Object.assign($auth.currentUser, state)
})
Vue.prototype.$auth = $auth
