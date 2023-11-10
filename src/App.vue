<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <section class="">
  <!-- <header class="h-64 w-screen bg-blue-900 bg-opacity-70 flex flex-col items-center p-2">
    <div class="h-10 w-10 rounded-full bg-black"></div>

    <div class="wrapper">
 
      <nav>
        <RouterLink to="/" class="text-white font-bold  ">Herois</RouterLink>

      </nav>
    </div>
  </header> -->
  <div class="bg-gradient-to-b from-[#00072d] to-black  h-screen overflow-y-scroll w-screen">
    <RouterView />
  </div>

</section>
</template>

<style scoped>

</style>
