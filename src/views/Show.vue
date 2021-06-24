<template>
  <div class="home">
    <div class="container">
      <div class="post">
        <div class="title">
          {{ post.title }}
        </div>

        <div class = "image">
          <img :src="post.imageUrl" :width="100" :height="100"/>
        </div>

        <i class="fas fa-tag"></i>
        <div class="tag" v-for="tag in post.tags" :key="tag.id">
          #{{ tag }} 
        </div>

        <div class="output ql-bubble">
          <div class="ql-editor" v-html="post.text"></div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
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


}

.title {
  text-align: center;
}

.image{
  text-align: center;
}

.home {
  margin: 0 auto;
  max-width: 6000px;
}
</style>
