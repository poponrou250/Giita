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
    }
  },
  created() {
    firebase
      .firestore()
      .collection("posts")
      .doc("d6xbhU1AHoppQlOXqVyV") //  将来的には -> this.$router.params.id
      .get()
      .then((doc) => {
        this.content = dedent(doc.data().text)
      })
  },
}
</script>

<style scoped></style>
