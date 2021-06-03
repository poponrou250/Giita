<template>
  <div>
    <Header /> <!-- componentを利用 -->
    <div class="app">
      <div>
        <p v-for="tweet in tweets" :key="tweet.id">
          {{ tweet.text }}
        </p>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
// import
import firebase from "firebase";
import Header from "@/components/Header.vue";
export default {
// componentの登録
  components: {
    Header, 
  },
   created() {
    firebase
      .firestore()
      .collection("tweets")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.tweets.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });
  }
};
</script>

