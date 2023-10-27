<script setup>
import { RouterView } from 'vue-router'



</script>

<template>
  <nav class="navbar navbar-dark bg-dark shadow">
    <div class="container-lg">
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo.png" alt="" width="80" height="80"
          class="d-inline-block align-text-center p-1 me-3 border bg-light rounded">
        <strong class="text-primary">SCCon Coffee Coupons</strong>
      </a>
    </div>
  </nav>
  <RouterView />
  <div class="eecclogo">
    <img id="eecclogo" src="@/assets/eecc.png" />
  </div>
</template>

<style lang="scss">
// Import Main styles for this application
@import "styles/variables";
@import 'bootstrap/scss/bootstrap';
@import 'styles/style';
</style>


