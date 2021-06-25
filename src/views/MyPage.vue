<template>
  <div class="mypage-container">
      <div class = "username">
        <font color="#FF4500"><b>{{ this.$auth.currentUser.displayName }}</b></font>さん
      </div>

      <div class="container">
        <div class="post" v-for="post in myposts.slice().reverse()" :key="post.id">
          <router-link :to="{ name: 'Show', params: { post_id: post.id } }"
              >

          <div class = "image">
            <img :src="post.imageUrl" :width="210" :height="200"/>
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

</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      keyword: "",
      posts: [],
      myposts: [],
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
        for (let i in this.posts) {
          if (this.posts[i].userId === this.$auth.currentUser.uid){
            this.myposts.push(this.posts[i])
          }
        }
      })
  },
}
</script>

<style scoped>

.username{
  font-size: 25px;
  padding: 20px;
  text-align: center;
}

.container {
  width: 90%;
  display: flex;
  justify-content:space-between;
  align-items: center;
  
  flex-wrap: wrap;

  margin: 20px auto;
}

.container::after{
  content:"";
  display: block;
  width:30%;
}

.post {
  width: 30%;
  margin: 10px;
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
  height: 160px;

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
