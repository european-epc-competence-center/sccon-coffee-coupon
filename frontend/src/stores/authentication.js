import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import axios from 'axios'

export const authenticationStore = defineStore('authentication', () => {

  const ENDPOINT = 'http://localhost:3000/api'

  const toast = useToast()

  const offer = ref()

  const presentationRequest = ref()


  function $reset() {
    offer.value = undefined
  }


  async function getOffer() {
    try {
      const res = await axios.get(ENDPOINT + '/request/offer')
      if (res.status === 201 && authProducts.value.length == res.data.length) toast.info('Dupilcate authentication. This credential was already presented!')
      offer.value = res.data
    } catch (error) {
      if (!error.response || error.response.status != 404) console.log(error)
    }

  }

  async function getPresentationRequest() {
    const res = await axios.get(ENDPOINT + '/request/presentation')
    presentationRequest.value = res.data
  }

  return { $reset, offer, presentationRequest, ENDPOINT, getPresentationRequest, getOffer }
})
