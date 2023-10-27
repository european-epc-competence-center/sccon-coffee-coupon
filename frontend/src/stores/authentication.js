import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import axios from 'axios'

export const authenticationStore = defineStore('authentication', () => {

  const ENDPOINT = 'http://localhost:3000/api'

  const toast = useToast()

  const offer = ref()

  const presentationRequest = ref()

  const challenge = ref()


  function $reset() {
    offer.value = undefined
    presentationRequest.value = undefined
    challenge.value = undefined
  }


  async function getOffer() {
    try {
      if (!presentationRequest.value || !challenge.value) await getPresentationRequest()
      const res = await axios.get(ENDPOINT + '/request/offer/' + challenge.value)
      if (res.status === 201 && authProducts.value.length == res.data.length) toast.info('Dupilcate authentication. This credential was already presented!')
      offer.value = res.data
    } catch (error) {
      if (!error.response || error.response.status != 404) console.log(error)
    }

  }

  async function getPresentationRequest() {
    const res = await axios.get(ENDPOINT + '/request/presentation')
    presentationRequest.value = res.data
    challenge.value = presentationRequest.value.split('/').at(-1)
  }

  return { $reset, offer, presentationRequest, ENDPOINT, getPresentationRequest, getOffer }
})
