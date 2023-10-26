import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import axios from 'axios'

export const authenticationStore = defineStore('authentication', () => {

  const ENDPOINT = 'https://sccon.ssi.eecc.de/api'

  const toast = useToast()

  const offer = ref()


  function $reset() {
    offer.value = undefined
  }


  async function getOffer() {
    try {
      const res = await axios.get(ENDPOINT + '/offer')
      if (res.status === 201 && authProducts.value.length == res.data.length) toast.info('Dupilcate authentication. This credential was already presented!')
      offer.value = res.data
    } catch (error) {
      console.log(error)
    }

  }

  async function getPresentationRequest() {
    const res = await axios.get(ENDPOINT + '/presentation', { params: { productid }, withCredentials: true })
    authRequest.value = res.data
  }

  return { $reset, offer, ENDPOINT, getPresentationRequest, getOffer }
})
