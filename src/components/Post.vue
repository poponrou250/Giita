<template>
  <div class="Post__wrapper">
    <submit-form />
  </div>
</template>

<script>
import SubmitForm from "../components/SubmitForm.vue"
export default {
    components: { SubmitForm },
}
</script>

<style scoped>
.Post__wrapper {
  margin: 0 auto;
  max-width: 600px;
  background-color: #ccc;
}
</style>