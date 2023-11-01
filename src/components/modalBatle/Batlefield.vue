<script setup>
import { ref, onMounted } from "vue";
import { useBattles } from "../../stores/storeBattles"
const store = useBattles();
const powerStats = ref([]);
const winner = ref('');
const power = ref([])
function batle() {
    store.champs.filter(item => {
        powerStats.value.push({
            name: item.name,
            power: item.powerstats.combat + item.powerstats.durability + item.powerstats.intelligence + item.powerstats.power + item.powerstats.speed + item.powerstats.strength
        });
        if (powerStats.value.length > 1) {
            powerStats.value.filter(item => {
                power.value.push(item.power)
                if (Math.max.apply(null, power.value) == item.power) {
                    winner.value = item.name;

                }

            })
        }
    })
}
function closeModal() {
    store.champs = [];
    store.modalBatle = false;
    winner.value = ''
}
onMounted(() => {

})
</script>
<template>
    <div v-if="store.modalBatle"
        class="w-1/3 h-96 flex justify-center gap-16 items-center right-[30%] top-20 m-auto fixed p-2 z-50  bg-black bg-opacity-90 rounded-lg">
        <span class="absolute top-2 right-4 text-2xl cursor-pointer text-white" @click="closeModal">x</span>
        <h1 v-if="store.opponent" class="absolute text-red-500">Versus</h1>
        <div class=" w-80 h-52 border-2 px-4" v-for=" item in store.champs" :key="store.id">
            <h1 class="text-center font-bold text-white">{{ item.name }}</h1>
            <div class="absolute">
                <ul class="list-none font-semibold text-gray-200">
                    <li>Combate: {{ item.powerstats.combat }}</li>
                    <li>Durabilidade: {{ item.powerstats.durability }}</li>
                    <li>Inteligencia: {{ item.powerstats.intelligence }}</li>
                    <li>Poder: {{ item.powerstats.power }}</li>
                    <li>Velocidade: {{ item.powerstats.speed }}</li>
                    <li>Força: {{ item.powerstats.strength }}</li>
                </ul>

            </div>
            <img :src="item.images.sm" class="w-32 h-40 float-right " />
        </div>
        <div class="absolute bottom-2 flex flex-col gap-2">
            <h1 class="text-gray-200">Vencedor é: <span class="text-green-500 font-bold">{{ winner }}</span> </h1>
            <button class=" bg-green-800 w-24 mx-auto text-gray-300  py-2 rounded-md hover:bg-green-500"
                @click="batle">Vencedor?</button>
        </div>

    </div>
</template>
../../stores/storeBattles