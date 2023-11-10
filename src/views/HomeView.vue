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
  <main class="flex flex-col relative px-10 h-screen">

   

    <h1 class="text-center text-[#0e6ba8] text-[3.8rem] mb-6 ">Duelistas</h1>
    <input type="text" placeholder="Procurar herói..." v-model="inputText" class="w-96 p-2 rounded-md ml-4" />
    <div class="flex w-full p-6 border-[0.1rem] m-4 rounded-md bg-[#01090E] bg-opacity-90 ">

    <div class="flex flex-wrap w-[800px] h-[800px] overflow-auto p-4 gap-2 bg-opacity-90 bg-[#1b1e2f]  rounded-sm ">

      <div v-for="item in filteredItems" :key="item.id"
        class=" border-[0.1rem] border-white shadow-md w-24 h-28  shadow-gray-300 hover:opacity-90 transition duration-300 justify-center flex flex-col items-center p-2 rounded-md bg-[#172a3a] hover:bg-gray-500 cursor-pointer"
        @click="store.increment(item)">

        <h1 class="text-[#d3d6df] font-bold text-center text-xs">{{ item.name }}</h1>
        <img :src="item.images.sm" class="h-full w-full" />

      </div>
   
    </div>
    <Batlefield />
  </div>
</main>
</template>
