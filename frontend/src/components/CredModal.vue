<template>
    <div class="modal" id="credModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
            <div class="modal-content bg-light">
                <div class="modal-header">
                    <h1 class="modal-title px-3">Authentication</h1>
                    <button type="button" class="btn-close btn-lg me-3" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    {{ credentials }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { authenticationStore } from '@/stores/authentication'
import { computed } from 'vue'

const authStore = authenticationStore()


const credentials = computed(() => {
    return authStore.credentials
})



</script>