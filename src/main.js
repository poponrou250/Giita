import Vue from "vue"
import App from "./App.vue"
import "./firebase.js"
import router from "./router"
import vuetify from "./plugins/vuetify"
import VueQuillEditor from "vue-quill-editor"
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")
