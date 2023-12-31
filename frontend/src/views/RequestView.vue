<template>
    <div class="container container-lg h-100 pt-5">
        <div class="row justify-content-center align-items-center">
            <div v-if="offer" class="col-12 m-3 text-center">
                <h2>Claim your Coupon credential!</h2>
                <button @click="authStore.$reset()" class="btn btn-lg text-white btn-primary mt-3">
                    Retry <i class="bi bi-arrow-repeat"></i>
                </button>
            </div>
            <div v-else class="col-12 m-3 text-center">
                <h2>Present your data credentials to get a sweet coffe coupon!</h2>
            </div>
            <div class="col-12 m-3 text-center">
                <div>
                    <qrcode-vue v-if="offer || presentationRequest" :value="offer || presentationRequest" :margin="1"
                        :size="500" level="M" class="my-3 shadow" id="presentation-request-canvas" />
                    <div v-else class="my-3" style="min-height: 500px;">
                        <p class="p-5 m-0 text-muted">Requesting presentation challenge</p>
                        <div class="spinner-border text-primary m-5" role="status"
                            style="width: 5rem; height: 5rem; top: 150px;">
                            <span class="visually-hidden">Requesting ...</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mt-3 text-muted">
                            <small>Using the <strong>{{ offer ? 'OpenID4VCI' : 'OpenID4VP' }}</strong>
                                protocol with</small>
                        </div>
                        <div class="col-12">
                            <a href="https://hidy.eu" target="_blank">
                                <img class="rounded p-2 m-3 shadow bg-light"
                                    src="https://hidy.eu/wp-content/uploads/2023/06/Hidy-logo-Name-black-e1686128821718.png"
                                    height="60" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <CredModal />
</template>

<script setup>
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue'
import { authenticationStore } from '@/stores/authentication'
import QrcodeVue from 'qrcode.vue'
import { useToast } from 'vue-toastification'
import { Modal } from 'bootstrap'
import CredModal from '@/components/CredModal.vue'

const authStore = authenticationStore()

const toast = useToast()

const intervalId = ref()

onMounted(async () => {
    await startQueryOffer()
})

onBeforeUnmount(() => {
    if (intervalId.value) clearInterval(intervalId.value)
})

const credentials = computed(() => {
    return authStore.credentials
})

const offer = computed(() => {
    return authStore.offer
})

const presentationRequest = computed(() => {
    return authStore.presentationRequest
})

function stopQueryOffer() {
    if (intervalId.value) clearInterval(intervalId.value)
    intervalId.value = undefined
}

async function startQueryOffer() {
    await authStore.getPresentationRequest()
    stopQueryOffer()
    intervalId.value = setInterval(authStore.getOffer, 3000);
}

watch(offer, async (currentValue, oldValue) => {
    if (currentValue) {
        stopQueryOffer()
        toast.success('Received credential offer!')
    }
    else await startQueryOffer()
})

watch(credentials, (currentValue, oldValue) => {
    if (currentValue.length > 0) {
        Modal.getOrCreateInstance(document.getElementById('credModal')).show()
        toast.success(`Successfully presented ${currentValue.length} credentials!`)
    }
})

</script>
