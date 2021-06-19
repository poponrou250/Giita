<template>
  <v-app>
    <!-- componentを利用 -->
    <Header />
    <p>ようこそ{{ this.$auth.currentUser.displayName }}さん</p>
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

export default {
  // componentの登録
  components: {
    Header,
    Footer,
  },
}
</script>

<style scoped>
.body {
  background-color: aquamarine;
}
</style>
