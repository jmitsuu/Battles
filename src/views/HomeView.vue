<script setup>
import Batlefield from "../components/modalBatle/Batlefield.vue";
import { useBattles } from "../stores/storeBattles"
const store = useBattles();
import { ref, computed, onMounted } from "vue";
import axios from "axios";
const champ = ref();
const datachamp = ref([])
const inputText = ref('')
async function getchamp() {
  const { data } = await axios.get(`http://homologacao3.azapfy.com.br/api/ps/metahumans`);
  champ.value = data
  datachamp.value = data;
}
const filteredItems = computed(() => {
  if (champ.value && inputText.value) {
    champ.value = champ.value.filter(item => {
      return item.name.toLowerCase().includes(inputText.value.toLowerCase())
    })
  } else {
    champ.value = datachamp.value
  }
  return champ.value;
})
onMounted(()=>{
  getchamp();
})

</script>

<template>
  <section class="flex flex-col relative ">

    <Batlefield />

    <h1 class="text-center text-gray-200 text-[3.8rem] ">Duelistas</h1>

    <input type="text" placeholder="Procurar herói..." v-model="inputText" class="w-96 p-2 rounded-md ml-4" />

    <main class="grid xl:grid-cols-8 md:grid-cols-4 sm:grid-cols-2  w-full min-h-screen p-4 gap-2">

      <div v-for="item in filteredItems" :key="item.id"
        class=" border-[0.1rem] border-white shadow-md h-80 w-full  shadow-gray-300 hover:opacity-90 transition duration-300 justify-center flex flex-col items-center p-2 rounded-md bg-black hover:bg-gray-500 cursor-pointer"
        @click="store.increment(item)">

        <h1 class="text-gray-200 font-bold text-center">{{ item.name }}</h1>
        <img :src="item.images.sm" />

      </div>

    </main>
  </section>
</template>
