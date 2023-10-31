<script setup>
import { RouterView } from 'vue-router'

import { authenticationStore } from '@/stores/authentication'

const authStore = authenticationStore()

</script>

<template>
  <nav class="navbar navbar-dark bg-dark shadow">
    <div class="container-lg">
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo.png" alt="" width="80" height="80"
          class="d-inline-block align-text-center p-1 me-3 border bg-light rounded">
        <strong class="text-primary fs-1">SCCon Coffee Coupons</strong>
      </a>
    </div>
  </nav>
  <RouterView />
  <button class="btn btn-primary position-fixed top-50 text-start text-white p-3 py-5" style="right: -10px;" type="button"
    data-bs-toggle="offcanvas" data-bs-target="#infocanvas" aria-controls="infocanvas">
    <h3 class="m-0"><i class="bi bi-arrow-left-circle"></i><i class="bi bi-info-lg"></i></h3>
  </button>
  <div v-if="authStore.offer" class="offcanvas offcanvas-end" tabindex="-1" id="infocanvas"
    aria-labelledby="infocanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="infocanvasLabel">Convert a credential offer
      </h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body text-start">
      <p>You have been offered a credential. In order to claim the credential you have to prove knowledge of the offer
        secret and sign it with a presentation to proof the possession of the keys to which the credential then will be
        issued.</p>
      <p>Scan the QR-Code to perform this action.</p>
      <img src="@/assets/eecc.png" class="position-absolute p-3" style="height: 100px; right: 0; bottom: 0;" />
      <button style="left: -60px;" type="button"
        class="btn btn-primary position-absolute top-50 text-white p-3 py-5 rounded-0 rounded-start"
        data-bs-dismiss="offcanvas" aria-label="Close">
        <h3 class="mb-0"><i class="bi bi-arrow-right-circle"></i></h3>
      </button>
    </div>
  </div>
  <div v-else-if="authStore.presentationRequest" class="offcanvas offcanvas-end" tabindex="-1" id="infocanvas"
    aria-labelledby="infocanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="infocanvasLabel">Answer a presentation
        request</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body text-start">
      <p>Showing a credential in a trusted way needs to be done in form of a verifiable presentation. This means
        that you, the presenter, have to sign the credential in order to prove that you are the rightful owner of the
        cryptographic keys to which the credential was assigned. As a result the process proves ownership of a
        credential and provides the authentication the requesting party.</p>
      <p>To do that scan the QR-Code if you possess the requested credentials and select those you actually want to
        present.</p>
      <p>You are currently asked to present the following credentials:</p>
      <ul class="mt-3 fw-bold">
        <li>KDKCredential</li>
      </ul>
      <img src="@/assets/eecc.png" class="position-absolute p-3" style="height: 100px; right: 0; bottom: 0;" />
      <button style="left: -60px;" type="button"
        class="btn btn-primary position-absolute top-50 text-white p-3 py-5 rounded-0 rounded-start"
        data-bs-dismiss="offcanvas" aria-label="Close">
        <h3 class="mb-0"><i class="bi bi-arrow-right-circle"></i></h3>
      </button>
    </div>
  </div>
  <div v-else class="offcanvas offcanvas-end" tabindex="-1" id="infocanvas" aria-labelledby="infocanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="infocanvasLabel">Requesting a presentaiton request</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body text-start">
      <p>...</p>
      <img src="@/assets/eecc.png" class="position-absolute p-3" style="height: 100px; right: 0; bottom: 0;" />
      <button style="left: -60px;" type="button"
        class="btn btn-primary position-absolute top-50 text-white p-3 py-5 rounded-0 rounded-start"
        data-bs-dismiss="offcanvas" aria-label="Close">
        <h3 class="mb-0"><i class="bi bi-arrow-right-circle"></i></h3>
      </button>
    </div>
  </div>
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


