<template>
  <div class="home">
    <div class="container">
      <div class="post">
        <div class="tag" v-for="tag in post.tags" :key="tag.id">
          {{ tag.name }}
        </div>

        <div class="title">
          {{ post.title }}
        </div>

        <div class="Detail__wrapper"><Detail /></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import Detail from "../components/Detail.vue"
export default {
  data() {
    return {
      keyword: "",
      post: {},
    }
  },
  created() {
    firebase
      .firestore()
      .collection("posts")
      .doc(this.$route.params.post_id)
      .get()
      .then((doc) => {
        this.post = doc.data()
      })
  },
  components: { Detail },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  margin: 30px auto;
}

.post {
  width: 25%;
  margin: 10px;
  padding: 10px;

  border: solid 2px;
  border-radius: 15px;
}

.title {
  text-align: center;
}
.home {
  margin: 0 auto;
  max-width: 6000px;
  background-color: rgb(208, 243, 192);
}
</style>
