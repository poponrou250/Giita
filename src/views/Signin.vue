<template>
  <div>
    <h1>SING IN</h1>
    <div>
      <h3>E-mail</h3>
      <input type="text" placeholder="E-mail" v-model="email" />
    </div>
    <div>
      <h3>Password</h3>
      <input type="text" placeholder="Password" v-model="password" />
    </div>
    <button v-on:click="signIn">Signin</button>
  </div>
</template>

<script>
import firebase from "firebase"

export default {

  data() {
    return {
      users: [],
      email: "",
      password: ""
    };
  },

  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(()=> {
        alert('Success!');
      })
      .catch(error => {
          alert("Error!", error.message)
          console.error("Account Login Error", error.message)
      })
    },
  }
}
</script>