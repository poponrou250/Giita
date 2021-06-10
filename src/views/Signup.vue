<template>
  <div>
    <h1>SING UP</h1>
    <div>
      <h3>E-mail</h3>
      <input type="text" placeholder="E-mail" v-model="email" />
    </div>
    <div>
      <h3>Password</h3>
      <input type="text" placeholder="Password" v-model="password" />
    </div>
    <button v-on:click="signUp">Signup</button>
  </div>
</template>

<script>
import firebase from "firebase"

export default {

  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(()=> {
        alert('RegisterSuccess!');
      })
      .catch(error => {
          alert("Error!", error.message)
          console.error("Account Regeister Error", error.message)
      })
    },
  }
  
};

</script>