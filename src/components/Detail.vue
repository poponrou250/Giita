<template>
  <div v-html="text"></div>
</template>

<script>
import firebase from "firebase"
import Vue from "vue"
import VueQuillEditor from "vue-quill-editor"
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
Vue.use(VueQuillEditor)
export default {
  data() {
    return {
      text: [],
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
          this.text.push(doc.data().text)
          console.log(doc.data().text)
        })
      })
  },
}
</script>

<style scoped></style>
