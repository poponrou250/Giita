<template>
  <header>
    <h1><router-link to="/">Giita</router-link></h1>
    <div class="header-list">
      <ul>
        <li><router-link to="/">ホーム</router-link></li>
        <li v-if="this.$auth.currentUser.displayName !== 'ゲスト'">
          <router-link to="/post">投稿</router-link>
        </li>
        <li v-if="this.$auth.currentUser.displayName === 'ゲスト'">
          <button v-on:click="signIn">SignIn</button>
        </li>
        <li v-if="this.$auth.currentUser.displayName !== 'ゲスト'">
          <router-link to="/my-page">マイページ</router-link>
        </li>
        <li v-if="this.$auth.currentUser.displayName !== 'ゲスト'">
          <button v-on:click="signOut">SingOut</button>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
/* HeaderのCSS */

/* ページ全体の余白を消す */
* {
  padding: 0;
  margin: 0;
}

/* Header部分 */
header {
  background-color: green;
  height: 80px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header a {
  text-decoration: none;
  color: white;
  transition-duration: 0.3s;
}

header button{
  color: white;
  transition-duration: 0.3s;
}

header a:hover , header button:hover{
  color: rgb(230, 213, 213);
}

header h1 {
  margin-left: 20px;
}

.header-list {
  display: flex;
  align-items: center;
}

/* flexでli要素を横に並べる */
header ul {
  display: flex;
  justify-content: space-around;
  margin-right: 20px;
}

header li {
  list-style: none;
  margin-right: 40px;
}
</style>

<script>
import firebase from "firebase"

export default {
  methods: {
    signIn() {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((userCredential) => {
          alert("Success!")
          var user = userCredential.user
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set({ email: user.email, name: user.displayName })
        })
        .catch((error) => {
          alert("Error!", error.message)
          console.error("Account Login Error", error.message)
        })
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Logout!")
        })
        .catch((error) => {
          alert(error)
        })
    },
  },
}
</script>
