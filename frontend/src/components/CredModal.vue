<template>
    <div class="modal" id="credModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title px-3">Your presentation</h1>
                    <button type="button" class="btn-close btn-lg me-3" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center p-3">
                    <div class="accordion accordion-flush" id="credentialsAccordeon">
                        <div v-for="cred in credentials" class="accordion-item">
                            <h2 class="accordion-header" :id="getCredId(cred)">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    :data-bs-target="'#collapse' + getCredId(cred)" aria-expanded="false"
                                    :aria-controls="'collapse' + getCredId(cred)">
                                    {{ cred.type.length > 1 ? cred.type.filter(t => t != 'VerifiableCredential')[0] :
                                        cred.type[0] }}
                                </button>
                            </h2>
                            <div :id="'collapse' + getCredId(cred)" class="accordion-collapse collapse"
                                :aria-labelledby="getCredId(cred)" data-bs-parent="#credentialsAccordeon">
                                <ul class="text-start mt-3 mb-5">
                                    <li class="mt-3"
                                        v-for="credSubKey in Object.keys(cred.credentialSubject).filter(k => k != 'id')">
                                        <h5>{{ credSubKey }}</h5>
                                        <span class="badge bg-secondary">{{ cred.credentialSubject[credSubKey] }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
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

function getCredId(cred) {
    return cred.id.split('/').at(-1)
}

</script>