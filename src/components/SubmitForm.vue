<template>
  <div class="form__wrapper">
    <div class="cp_iptxt">
      <input type="text" v-model="titleText" placeholder="タイトル" />
      <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
    </div>
    <quill-editor
      class="form__textarea"
      v-model="articleContentText"
      ref="quillEditor"
      v-bind:options="editorOption"
      placeholder="記事の内容"
    />
    <textarea
      class="form__textarea"
      v-model="codeContentText"
      placeholder="code"
    />
    <div>
      <h1>Tag</h1>
      <v-select :options="options" v-model="selected" multiple></v-select>
      <p>タグ：{{ selected }}</p>
    </div>
    <div class="form__buttons">
      <button v-on:click="postTweet" class="form__submit-button">投稿</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import Vue from "vue"
import VueQuillEditor from "vue-quill-editor"
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
Vue.use(VueQuillEditor)
export default {
  data() {
    return {
      tweets: [],
      titleText: "",
      articleContentText: "",
      editorOption: {
        theme: "bubble",
      },
      codeContentText: "",
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
    }
  },
  components: {
    vSelect,
  },
  methods: {
    postTweet() {
      /* 変更点 */
      const tweet = {
        title: this.titleText,
        text: this.articleContentText,
        code: this.codeContentText,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
        tags: this.selected,
        userId: this.$auth.currentUser.uid,
      }
      firebase
        .firestore()
        .collection("posts")
        .add(tweet)
        .then((ref) => {
          console.log(this)
          this.tweets.push({
            id: ref.id,
            ...tweet,
          })
        })
        .catch(function (error) {
          console.log("error", error)
        })
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

.tag_textarea {
  width: auto;
  height: 20px;
  background: white;
}

.tag-list {
  display: inline-block;
  margin-top: 0px;
}

.input-area {
  display: inline-block;
  width: 100px;
  height: 20px;
  background: white;
}

.tag {
  padding: 2px;
  background: rgb(176, 178, 179);
}

.delete {
  cursor: pointer;
}
</style>
