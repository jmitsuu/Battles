<script setup>
import { ref, onMounted } from "vue";
import { useBattles } from "../../stores/storeBattles";
import Attributes from "../../helpers/Heros";
import { onClickOutside } from '@vueuse/core'
const target = ref(null)
const store = useBattles();
const powerStats = ref([]);
const winner = ref("");
const power = ref([]);
function batle() {
  store.champs.forEach((item) => {
    powerStats.value.push({
      name: item.name,
      power: Attributes(item),
    });
  });

  powerStats.value.forEach((item) => {
    power.value.push(item.power);
    if (Math.max.apply(null, power.value) === item.power) {
      winner.value = item.name;
    }
  });
}
function closeModal() {
  store.champs = [];
  powerStats.value = [];
  power.value = [];
  store.modalBatle = false;
  winner.value = "";
  store.opponent = false;
  console.log(winner.value);
}
onClickOutside(target, () =>store.modalBatle = false)
onMounted(() => {});
</script>
<template>
  <Transition>


  <div
    ref="target"
    v-if="store.modalBatle"
    class=" w-full mx-auto overflow-hidden flex flex-col justify-center  gap-16 items-center relative p-2 z-50 bg-gray-900  rounded-lg"
  >
    <span
      class="absolute top-2 right-4 text-2xl cursor-pointer text-white"
      @click="closeModal"
      >x</span
    >
    <div class="flex relative gap-10">

  
   
    <div
      class="w-96 h-96 border-[0.1rem]  shadow-md shadow-fuchsia-50  px-2 py-3 rounded-md"
      v-for="item in store.champs"
      :key="store.id"
    >
      <div class="w-full h-7 text-center">
        <h1 class="text-center font-bold text-2xl text-white mb-4  ">{{ item.name }}</h1>
      </div>
      <div class="flex w-full h-full justify-center items-center ">
        <ul class="list-none font-semibold flex flex-col  mr-4 text-gray-200">
          <li>Combate: {{ item.powerstats.combat }}</li>
          <li>Durabilidade: {{ item.powerstats.durability }}</li>
          <li>Inteligencia: {{ item.powerstats.intelligence }}</li>
          <li>Poder: {{ item.powerstats.power }}</li>
          <li>Velocidade: {{ item.powerstats.speed }}</li>
          <li>Força: {{ item.powerstats.strength }}</li>
        </ul>
        <img :src="item.images.sm" class=" h-72 " />
      </div>
   
    </div>
    <!-- <h1 v-if="store.opponent" class="fixed text-red-500">Versus</h1> -->
  </div>
    <div class=" flex flex-col gap-2">
      <h1 class="text-gray-200 text-[1.4rem] mb-7">
        Vencedor é: <span class="text-green-500 font-bold text-[2.1rem]">{{ winner }}</span>
      </h1>
      <button
        class="bg-green-800 w-24 text-xl mx-auto text-gray-300 py-2 rounded-md hover:bg-green-500"
        @click="batle"
      >
        Duelar
      </button>
    </div>
  </div>
</Transition>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>