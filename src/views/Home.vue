<template>
  <div class="home">
    <input type="radio" value="web" v-model="keyword" />web

    <input type="radio" value="iphone" v-model="keyword" />iphone

    <input type="radio" value="game" v-model="keyword" />game

    <div class="container">
      <div class="post" v-for="post in filteredPosts" :key="post.id">
        <div class="tag" v-for="tag in post.tags" :key="tag.id">
          {{ tag.name }}
        </div>

        <div class="title">
          {{ post.title }}
        </div>

        <div class="text">
          <!-- {{ post.text }} -->
        </div>

        <div class="link">
          <router-link :to="{ name: 'Show', params: { post_id: post.id } }"
            >詳細</router-link
          >
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
      keyword: "",
      posts: [],
    }
  },
  created() {
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.posts.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
  },

  computed: {
    filteredPosts: function () {
      let posts = []

      if (this.keyword) {
        for (let i in this.posts) {
          const post = this.posts[i]
          for (let j in post.tags) {
            const tag = post.tags[j]
            if (tag.name === this.keyword) {
              posts.push(post)
              break
            }
          }
        }
        return posts
      } else {
        return this.posts
      }
    },
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
