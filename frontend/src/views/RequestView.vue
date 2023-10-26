<template>
    <div class="container container-lg h-100">
        <div class="row justify-content-center align-items-center">
            <div class="col-12 m-5 text-center">
                <div>
                    <qrcode-vue v-if="authStore.authRequest" :value="authStore.authRequest" :margin="1" :size="500"
                        level="M" class="my-3 shadow" id="presentation-request-canvas" />
                    <div v-else class="my-3" style="min-height: 500px;">
                        <p class="p-5 m-0 text-muted">Requesting presentation challenge</p>
                        <div class="spinner-border text-primary m-5" role="status"
                            style="width: 5rem; height: 5rem; top: 150px;">
                            <span class="visually-hidden">Requesting ...</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mt-3 text-muted">
                            <small>Using the <strong>OpenID4VP</strong>
                                protocol</small>
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
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { authenticationStore } from '@/stores/authentication'
import QrcodeVue from 'qrcode.vue'
import { useToast } from 'vue-toastification'

const authStore = authenticationStore()

const toast = useToast()

const intervalId = ref()

onMounted(async () => {
    new Tooltip(document.body, {
        selector: "[data-bs-toggle='tooltip']"
    })

    const authModal = document.getElementById('authModal')

    authModal.addEventListener('shown.bs.modal', event => {
        if (router.currentRoute.value.path.startsWith('/view/')) authStore.getAuthRequest(route.params.id)
        else authStore.getAuthRequest()
        if (intervalId.value) clearInterval(intervalId.value);
        intervalId.value = setInterval(authStore.getAuthenticatedProducts, 3000);
    })

    authModal.addEventListener('hidden.bs.modal', event => {
        if (intervalId.value) clearInterval(intervalId.value)
    })

})

const authProducts = computed(() => {
    return authStore.authProducts
})

watch(authProducts, (currentValue, oldValue) => {
    if (currentValue.length > oldValue.length) {
        Modal.getOrCreateInstance(document.getElementById('authModal')).hide()
        toast.success('Successfully authenticated!')
        // redirect to entry if product is not matching
        // if (router.currentRoute.value.path.startsWith('/view/') && route.params.id && !authProducts.value.map(p => p.id).includes(route.params.id)) router.push({ path: '/' })
    }
})

</script>
