<template>
  <v-app>
    <!-- componentを利用 -->
    <Header />
    <div>
      <p v-for="tweet in tweets" :key="tweet.id">
        {{ tweet.text }}
      </p>
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import
import firebase from "firebase"
import Header from "@/components/Header.vue"
export default {
  // componentの登録
  components: {
    Header,
  },
  data() {
    return {
      tweets: [],
    }
  },
  created() {
    firebase
      .firestore()
      .collection("tweets")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.tweets.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
  },
}
</script>
