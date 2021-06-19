<template>
  <div class="output ql-bubble">
    <div class="ql-editor" v-html="content"></div>
  </div>
</template>

<script>
import dedent from "dedent"
import Vue from "vue"
import firebase from "firebase"
import VueQuillEditor from "vue-quill-editor"
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
Vue.use(VueQuillEditor)
export default {
  data() {
    return {
      content: dedent,
    }
  },
  created() {
    firebase
      .firestore()
      .collection("posts")
      .where("code", "==", "a")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.content = doc.data().text
          //   console.log(doc.data().text)
        })
      })
  },
}
</script>

<style scoped></style>
