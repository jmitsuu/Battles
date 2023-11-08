import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBattles = defineStore('useBattles', () => {
  const champs = ref([])
  const modalBatle = ref(false)
  const opponent = ref(false)

  function increment(items) {
    if (!items) return
    if (items.length > 1) {
    }
    if (champs.value.length < 2) {
      champs.value.push(items)
    }
    if (champs.value.length > 1) {
      opponent.value = true
    }

    modalBatle.value = true

    console.log(champs.value.length)
  }

  return { increment, champs, modalBatle, opponent }
})
