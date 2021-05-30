<template>
  <div class="Post__wrapper">
    <submit-form />
  </div>
</template>

<script>
export default {
    import SubmitForm from "../components/SubmitForm.vue"
}
</script>

<style scoped>
.Post__wrapper {
  margin: 0 auto;
  max-width: 600px;
  background-color: #ccc;
}
</style>