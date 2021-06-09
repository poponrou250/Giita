<template>
  <div class="form__wrapper">
    <div class="cp_iptxt">
      <input type="text" v-model="titleText" placeholder="タイトル" />
      <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
    </div>
    <textarea
      class="form__textarea"
      v-model="articleContentText"
      placeholder="記事の内容"
    />
    <textarea
      class="form__textarea"
      v-model="codeContentText"
      placeholder="code"
    />
    <b-upload type="file" style="margin-top: 1rem" @change.native="uploadImage">
      <a class="button is-info">
        <b-icon
          pack="fas"
          icon="upload"
          size="medium"
          style="
            margin-right: 0.5rem;
            margin-bottom: 0.05rem;
            vertical-align: middle;
          "
        ></b-icon>
        プロフィール画像を変更する
      </a>
    </b-upload>
    <v-combobox
      multiple
      v-model="select"
      label="Tags"
      append-icon
      chips
      deletable-chips
      class="tag-input"
      :search-input.sync="search"
      @keyup.tab="updateTags"
      @paste="updateTags"
    ></v-combobox>
    <div class="form__buttons">
      <button v-on:click="postTweet" class="form__submit-button">投稿</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
// import moment from "moment"
export default {
  data() {
    return {
      // tweets: [],
      titleText: "",
      articleContentText: "",
      codeContentText: "",
      // displayName: "",
      // imageURL: null,
      moment: null,
      select: ["web", "iPhone", "game"],
    }
  },
  methods: {
    // //選択したファイルを保存
    // selectFile(e) {
    //   this.$store.dispatch("selectFile", e)
    // },
    postTweet() {
      this.$store.dispatch("upload")
      // this.moment = moment().format("YYYY-MM-DD")
      /* 変更点 */
      const tweet = {
        title: this.titleText,
        text: this.articleContentText,
        code: this.codeContentText,
        // imageurl: this.$store.getters.imageURL,
        moment: this.moment,
      }
      firebase
        .firestore()
        .collection("posts")
        .add(tweet)
        .then((res) => {
          console.log(this)
          // this.tweets.push({
          //   id: ref.id,
          //   ...tweet,
          // })
          // this.$store.dispatch("initialize")
        })
        .catch(function (error) {
          console.log("error", error)
        })
    },
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","))
        this.$nextTick(() => {
          this.search = ""
        })
      })
    },
  },
}
</script>

<style scoped>
.cp_iptxt {
  position: relative;
  width: 27.33%;
  margin: 10px 3%;
}
.cp_iptxt input[type="text"] {
  font: 15px/24px sans-serif;
  box-sizing: border-box;
  width: 100%;
  padding: 0.3em;
  padding-left: 40px;
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
}
.form__textarea {
  width: 95%;
  height: calc(1.3rem * 3 + 0.5rem * 70);
  padding: 0.5rem;
  line-height: 1.3rem;
  border-radius: 5px;
  border: none;
  resize: none;
}
.form__textarea:focus {
  outline: none;
}
.form__buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
