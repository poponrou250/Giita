<template>
  <div class="home__wrapper">
    <submit-form />
  </div>
</template>

<script>
import SubmitForm from "../components/SubnitForm.vue"
export default {
  components: { SubmitForm },
}
</script>

<style scoped>
.home__wrapper {
  margin: 0 auto;
  max-width: 6000px;
  background-color: rgb(208, 243, 192);
}

</style>
