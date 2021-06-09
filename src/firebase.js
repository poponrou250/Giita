import firebase from "firebase"
import "firebase/firestore"
// import store from "./store"

Vue.use(Vuetify, {
  iconfont: "md",
})
Vue.config.productionTip = false

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
