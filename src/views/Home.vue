<template>
  <div class="home">

    <div class = "username">
      ようこそ<font color="red"><b>{{ this.$auth.currentUser.displayName }}</b></font>さん
    </div>

    <fieldset>
      <input id="item-1" class="radio-inline__input" type="radio" name="accessible-radio" value="" v-model="keyword" checked="checked"/>
      <label class="radio-inline__label" for="item-1">
          all
      </label>

      <input id="item-2" class="radio-inline__input" type="radio" name="accessible-radio" value="web" v-model="keyword" checked="checked"/>
      <label class="radio-inline__label" for="item-2">
          #web
      </label>

      <input id="item-3" class="radio-inline__input" type="radio" name="accessible-radio" value="iphone" v-model="keyword"/>
      <label class="radio-inline__label" for="item-3">
          #iphone
      </label>

      <input id="item-4" class="radio-inline__input" type="radio" name="accessible-radio" value="game" v-model="keyword"/>
      <label class="radio-inline__label" for="item-4">
          #game
      </label>
    </fieldset>



    <div class="container">
      <div class="post" v-for="post in filteredPosts" :key="post.id">
      
        <div class="title">
          {{ post.title }}
        </div>

        <div class="text">
          <!-- {{ post.text }} -->
        </div>

        <i class="fas fa-tag"></i>
        <div class="tag" v-for="tag in post.tags" :key="tag.id">
          #{{ tag.name }} 
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
      tags : [
        {name: "web"},
        {name: "iphone"},
        {name: "game"},
        {name: "python"},
      ],
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

.username{
  padding: 20px;
  text-align: center;
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.radio-inline__input {
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute !important;
}

.radio-inline__label {
    display: inline-block;
    padding: 0.5rem 1rem;
    margin-right: 18px;
    border: solid 2px;
    border-radius: 50%;
    transition: all .2s;
    cursor: pointer;
}

.radio-inline__label:hover {
  transform: scale(1.1);

}

.radio-inline__input:checked + .radio-inline__label {
    background: #139176f4;
    color: #fff;
}

.container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  margin: 20px auto;
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
}
</style>
