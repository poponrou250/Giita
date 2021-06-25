<template>
  <div class="container">
    <div class="post">
      <div class="image">
        <img :src="post.imageUrl" :width="300" :height="250" />
      </div>

      <div class="post_title">
        {{ post.title }}
      </div>

      <div class="post_username">
        {{ post.username }}
      </div>

      <div class="tag_container">
        <i class="fas fa-tag"></i>
        <div class="tag" v-for="tag in post.tags" :key="tag.id">#{{ tag }}</div>
      </div>

      <div class="output ql-bubble">
        <div class="ql-editor" v-html="post.text"></div>
      </div>

      <div class="like_button">
        <button v-on:click="likePost"><i class="fas fa-thumbs-up"></i></button>
        {{ post.likes }}
      </div>

      <div
        class="delete_button"
        v-if="this.$auth.currentUser.uid === post.userId"
      >
        <button v-on:click="deletePost">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>

    <div id="page_top"><a href="#"></a></div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      post: {},
      // liked_posts: [],
      // liked_post: {},
      // new_liked_posts: [],
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

  methods: {
    deletePost() {
      window.alert("削除してもよろしいですか？")
      firebase
        .firestore()
        .collection("posts")
        .doc(this.$route.params.post_id)
        .delete()
        .then(() => {
          alert("successfully deleted!")
        })
        .catch((error) => {
          console.error("Error removing document: ", error)
        })
      this.$router.push("/")
    },
    

    likePost() {
      let likes = this.post.likes + 1
      firebase
        .firestore()
        .collection("posts")
        .doc(this.$route.params.post_id)
        .update({
          likes: likes
        })
      // // もしユーザーがログインしていた場合、自分のいいね記事を記録する 
      // if (this.$auth.currentUser!== "ゲスト") {

      //   // 現在のいいね記事を取得
      //   firebase
      //     .firestore()
      //     .collection("users")
      //     .doc(this.$auth.currentUser.uid)
      //     .get()
      //     .then((doc) => {
      //       this.liked_posts = doc.data().liked_posts
      //     })

      //   // 新たないいね記事を更新

      //   this.liked_post = this.$route.params.post_id
      //   this.liked_posts.push(this.liked_post)

      //   // 重複削除
      //   this.new_liked_posts = Array.from(new Set(this.liked_posts))
      //   // console.log(this.liked_posts)
      //   // console.log(this.new_liked_posts)

      //   firebase
      //     .firestore()
      //     .collection("users")
      //     .doc(this.$auth.currentUser.uid)
      //     .update({
      //       liked_posts: this.new_liked_posts
      //     })
      // }
      this.$router.go(0)
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
  width: 70%;
  margin: 10px;
  padding: 10px;
}

.post_title {
  text-align: center;

  margin: 10px 0px;
  font-size: 40px;
  font-weight: bold;
}

.image {
  text-align: center;
}

.post_username {
  text-align: right;
  margin: 10px auto;
  width: 50%;
}

.tag_container {
  display: flex;
  width: 50%;
  margin: 0 auto;
}

.tag {
  margin-right: 10px;
}

.like_button {
  font-size: 25px;
}

.like_button button:hover {
  color: blue;
  transform: scale(1.1);
}

.delete_button {
  font-size: 25px;
  text-align: right;
}

.delete_button button:hover {
  color: red;
  transform: scale(1.1);
}

#page_top {
  width: 60px;
  height: 60px;
  position: fixed;
  right: 0;
  bottom: 55px;
  opacity: 0.6;
}
#page_top a {
  width: 60px;
  height: 60px;
  text-decoration: none;
}
#page_top a::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f139";
  font-size: 50px;
  color: #3fefee;
}
</style>
