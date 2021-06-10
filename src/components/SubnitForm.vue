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
    <div class="form__buttons">
      <button v-on:click="postTweet" class="form__submit-button">投稿</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      tweets: [],
      titleText: "",
      articleContentText: "",
    }
  },
  methods: {
    postTweet() {
      /* 変更点 */
      const tweet = {
        title: this.titleText,
        text: this.articleContentText,
      }
      firebase
        .firestore()
        .collection("tweets")
        .add(tweet)
        .then((ref) => {
          this.tweets.push({
            id: ref.id,
            ...tweet,
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
