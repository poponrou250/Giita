<template>
  <div class="home-container">
    <div class = "background">
      <p class = "big__title">Giita = GeekSalon専用のQiita</p>
      <p class = "sub__title">あなたの知恵を未来のために</p>
    </div>

    <div class = "home">

      <div class = "username">
        ようこそ<font color="#FF4500"><b>{{ this.$auth.currentUser.displayName }}</b></font>さん
      </div>

      <fieldset>
        <input id="item-1" class="radio-inline__input" type="radio" name="accessible-radio" value="" v-model="keyword" checked="checked"/>
        <label class="radio-inline__label" for="item-1">
            All
        </label>

        <input id="item-2" class="radio-inline__input" type="radio" name="accessible-radio" value="Web" v-model="keyword" />
        <label class="radio-inline__label" for="item-2">
            #Web
        </label>

        <input id="item-3" class="radio-inline__input" type="radio" name="accessible-radio" value="iPhone" v-model="keyword"/>
        <label class="radio-inline__label" for="item-3">
            #iPhone
        </label>

        <input id="item-4" class="radio-inline__input" type="radio" name="accessible-radio" value="Game" v-model="keyword"/>
        <label class="radio-inline__label" for="item-4">
            #Game
        </label>

        <input id="item-5" class="radio-inline__input" type="radio" name="accessible-radio" value="WebExpert" v-model="keyword"/>
        <label class="radio-inline__label" for="item-5">
            #WebExpert
        </label>

        <input id="item-6" class="radio-inline__input" type="radio" name="accessible-radio" value="UIUX" v-model="keyword"/>
        <label class="radio-inline__label" for="item-6">
            #UIUX
        </label>

        <input id="item-7" class="radio-inline__input" type="radio" name="accessible-radio" value="VideoEditor" v-model="keyword"/>
        <label class="radio-inline__label" for="item-7">
            #VideoEditor
        </label>

        <input id="item-8" class="radio-inline__input" type="radio" name="accessible-radio" value="AI" v-model="keyword"/>
        <label class="radio-inline__label" for="item-8">
            #AI
        </label>
      </fieldset>



      <div class="container">
        <div class="post" v-for="post in filteredPosts.slice().reverse()" :key="post.id">
          <router-link :to="{ name: 'Show', params: { post_id: post.id } }"
              >

          <div class = "image">
            <img :src="post.imageUrl" :width="230" :height="200"/>
          </div>

          <div class="post__title">
            {{ post.title }}
          </div>

          <div class = "createdat">
            {{post.createdAt.toDate().getFullYear()}}年
            {{Number(post.createdAt.toDate().getMonth())+1}}月
            {{post.createdAt.toDate().getDate()}}日
          </div>

            <i class="fas fa-tag"></i>
          <div class="tag_container">
            <div class="tag" v-for="tag in post.tags" :key="tag.id">
              #{{ tag }} 
            </div>
          </div>

          <div class="output ql-bubble">
            <div class="ql-editor" v-html="post.text"></div>
          </div>
          </router-link
            >
        </div>
      </div>

      <div id="page_top"><a href="#"></a></div>
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
      .orderBy("createdAt")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.posts.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        this.posts
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
            if (tag === this.keyword) {
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

.home{
  width: 90%;
  margin: 0 auto;
}

.background{
  width: 100%;
  height: 400px;
  background-image: url(~@/assets/background.png);
  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;

}

.big__title{
  font-size: 50px;
  font-family: 'RocknRoll One', cursive;
}

.sub__title{
  font-size: 30px;
  font-family: 'RocknRoll One', cursive;
}

.username{
  font-size: 25px;
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
  
  flex-wrap: wrap;

  margin: 20px auto;
}

.post {
  width: 30%;
  margin: 10px auto;
  padding: 10px;

  height: 520px;

  border: solid 2px;
  border-color: gray;
  border-radius: 5px;

  box-shadow: 0px 10px 10px -5px rgba(0,0,0,0.3);

  transition: 0.1s;

  overflow: hidden;

}

.post__title{
  text-align: center;
  margin: 10px 0px;

  font-size: 28px;
  font-weight: bold;
  
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ql-editor {
  height: 200px;

  overflow: hidden;
}

.ql-editor p{
  overflow: hidden;
}

.post:hover{
  opacity: 0.8;
  cursor: pointer;

  box-shadow: 0px 10px 10px -5px rgba(0,0,0,0.8);

  transform: scale(1.01);
}

.post a{
  color: black;
  text-decoration: none;
}

.image{
  text-align: center;
}

.createdat{
  margin: 10px 0;
  text-align: right;

  flex-wrap: wrap;
}

.tag_container{
  display: flex;
}

.tag{
  margin-right: 5px;
}

#page_top{
  width: 60px;
  height: 60px;
  position: fixed;
  right: 0;
  bottom: 55px;
  opacity: 0.6;
}
#page_top a{
  width: 60px;
  height: 60px;
  text-decoration: none;
}
#page_top a::before{
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  content: '\f139';
  font-size: 50px;
  color: #3fefee;
}

</style>
