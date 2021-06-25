<template>
  <div class="container">
    <div class="post">
      <div class = "image">
        <img :src="post.imageUrl" :width="300" :height="250"/>
      </div>

      <div class="post_title">
        {{ post.title }}
      </div>

      <div class="post_username">
        {{post.username}}
      </div>

      <div class="tag_container">
        <i class="fas fa-tag"></i>
        <div class="tag" v-for="tag in post.tags" :key="tag.id">
          #{{ tag }} 
        </div>
      </div>

      <div class="output ql-bubble">
        <div class="ql-editor" v-html="post.text"></div>
      </div>

      <div class="delete_button" v-if="this.$auth.currentUser.uid === post.userId">
        <button v-on:click="deletePost"><i class="fas fa-trash-alt"></i></button>
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

  methods :{
    deletePost(){
      window.alert("削除してもよろしいですか？");
      firebase
        .firestore()
        .collection("posts")
        .doc(this.$route.params.post_id)
        .delete()
        .then(() =>{
          alert("successfully deleted!");
        }).catch((error)=> {
          console.error("Error removing document: ", error);
        });
        this.$router.push('/')
    }
  }

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

.image{
  text-align: center;
}

.post_username{
  text-align: right;
  margin: 10px auto;
  width: 50%;
}

.tag_container{
  display: flex;
  width: 50%;
  margin: 0 auto;
}

.tag{
  margin-right: 10px;
}

.delete_button{
  font-size: 25px;
  text-align: right;
}

.delete_button button:hover{
  color: red;
  transform: scale(1.1);
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
