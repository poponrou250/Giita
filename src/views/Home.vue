<template>
  <div class="home">
    <div class="container">
      <div class="tweet" v-for="tweet in tweets" :key="tweet.id">
        <div class="title">
          {{ tweet.title }}
        </div>

        <div class="text">
          {{ tweet.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      tweets: [],
    }
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

.tweet {
  width: 25%;
  margin: 10px;
  padding: 10px;

  border: solid 2px;
  border-radius: 15px;
}

.title {
  text-align: center;
}
.home {
  margin: 0 auto;
  max-width: 6000px;
  background-color: rgb(208, 243, 192);
}
</style>
