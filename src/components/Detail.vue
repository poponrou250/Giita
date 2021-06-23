<template>
  <div class="output ql-bubble">
    <div class="ql-editor" v-html="content"></div>
  </div>
</template>

<script>
import dedent from "dedent"
import firebase from "firebase"
export default {
  data() {
    return {
      content: "",
      keyword: "",
      post: {},
    }
  },
  created() {
    firebase
      .firestore()
      .collection("posts")
      .doc(this.$route.params.post_id) //  将来的には -> this.$router.params.id
      .get()
      .then((doc) => {
        this.content = dedent(doc.data().text)
      })
  },
}
</script>

<style scoped></style>
