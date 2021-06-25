<template>
  <div class="form__wrapper">
    <div class="cp_iptxt">
      <input type="text" v-model="titleText" placeholder="Title" />
    </div>

    <div class="tag__select">
      <h4><i class="fas fa-tag"></i>Tag</h4>
      <v-select :options="options" v-model="selected" multiple placeholder="Select tags"></v-select>
    </div>

    <div class="image__field">
      <h4><i class="far fa-image"></i> Thumbnail Image</h4>
        <input
          type="file"
          accept="image/*"
          :disabled="disabled"
          @change="onFileChange"
        />
      <span>{{ message }}</span>
    </div>

    <quill-editor
      class="form__textarea"
      v-model="articleContentText"
      ref="quillEditor"
      v-bind:options="editorOption"
      placeholder="記事の内容"
    />

    <div class="form__buttons">
      <button v-on:click="postTweet" class="form__submit-button"><i class="fas fa-upload"></i></button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"
export default {
  data() {
    return {
      tweets: [],
      titleText: "",
      articleContentText: "",
      validation: {
        titleText: false,
        articleContentText: false,
      },
      editorOption: {
        theme: "snow",
      },
      moment: null,
      selected: "",
      options: [
        "iPhone",
        "Game",
        "Web",
        "WebExpert",
        "AI",
        "UIUX",
        "VideoEditer",
      ],
      disabled: false,
      message: "",
      image: "https://firebasestorage.googleapis.com/v0/b/giita-f0038.appspot.com/o/images%2Fgeeksalon.jpeg?alt=media&token=6893c813-c612-44c3-94e4-7a1a17e115a2"
    }
  },
  components: {
    vSelect,
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.upload(file);
    },

    upload(file) {
      this.message = "アップロード中...";
      this.disabled = true;
      const storageRef = firebase.storage().ref();
      const createdAt = new Date();
      const timestamp = createdAt.getTime();
      const uniqueFileName = timestamp + "_" + file.name;
      const fileRef = storageRef.child("images/" + uniqueFileName);
      fileRef
        .put(file)
        .then(() => fileRef.getDownloadURL())

        .then(url => {
          const image = url
          return this.image = image
        })
        .then(() => {
          this.message = "アップロード完了！";
          setTimeout(() => {
            this.message = "";
            this.disabled = false;
          }, 1000);
        });
    },

    postTweet() {
      const tweet = {
        title: (this.titleText!== "") ? this.titleText : "You must define a title here",
        text: (this.articleContentText !== "") ? this.articleContentText : "You must write some text here.",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        tags: this.selected,
        imageUrl: this.image,
        userId: this.$auth.currentUser.uid,
        username: this.$auth.currentUser.displayName
      }
      if(this.titleText !== "" && this.articleContentText !== "" && this.selected !== ""){
        firebase
        .firestore()
        .collection("posts")
        .add(tweet)
        .then((ref) => {
          console.log(this)
          alert('Created!')
          this.tweets.push({
            id: ref.id,
            ...tweet,
          })
          this.$router.push('/')
        })
        .catch(function (error) {
          console.log("error", error)
        })
      }else{
        alert("タイトル, タグ, テキストを入力してください")
      }

    },
    // v-onでエンターキー押してTagのpush
    decide_tag(e) {
      this.tags.push({
        // id:
        name: e.target.textContent,
      })
      e.target.textContent = ""
      // console.log(this.tags)
    },
    delete(vm) {
      // タグを消すときはタグの配列をspliceして削除
      // 消えない→idでそれぞれのタグを識別できていないから？？
      this.tags.splice(vm.$index, 1)
    },
  },
}
</script>

<style scoped>

.tag__select {
  width: 95%;
  margin-bottom: 20px;
  
}

.tag__select:hover {
  cursor: pointer;
}

.tag-list {
  display: inline-block;
  margin-top: 0px;
}

.tag {
  padding: 2px;
  background: rgb(176, 178, 179);
}

.image__field{
  margin-bottom: 10px;
}

.cp_iptxt {
  position: relative;
  width: 27.33%;
  margin-top:10px;
  margin-bottom:10px;

  border: solid 1px;
  border-color: gray;
  border-radius: 5px;
}
.cp_iptxt input[type="text"] {
  font: 15px/24px sans-serif;
  box-sizing: border-box;
  width: 100%;
  padding: 0.3em;
  padding-left: 10px;
  letter-spacing: 1px;
  border: 0;
}

.cp_iptxt i {
  position: absolute;
  top: 0;
  left: 0;
  padding: 9px 5px;
  transition: 0.3s;
  color: #aaaaaa;
}

.form__wrapper {
  padding: 1rem;

  margin: 0 auto;
  max-width: 6000px;
  background-color: rgb(240, 243, 234);
}

.form__textarea {
  width: 95%;
  height: calc(1.3rem * 3 + 0.5rem * 70);
  padding: 0.5rem;
  margin-bottom: 100px;
  line-height: 1.3rem;
  border-color: gray;
  resize: none;
}
.form__textarea:focus {
  outline: none;
}
.form__buttons {
  margin-top: 20px;
  width: 95%;
  display: flex;
  justify-content: flex-end;

  position:relative;
  bottom: 25px;
}

.form__buttons button{
  transition: 0.1s;
  font-size: 30px;
}


.form__buttons button:hover{
  transform: scale(1.2);
}


.input-area {
  display: inline-block;
  width: 100px;
  height: 20px;
  background: white;
}

.delete {
  cursor: pointer;
}
</style>