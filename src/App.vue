<template>
  <v-app>
    <!-- componentを利用 -->
    <Header />
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

body{
  font-family: 'Amatic SC', cursive;
}

.v-main{
    background-color: rgb(240, 243, 234);
}

</style>
