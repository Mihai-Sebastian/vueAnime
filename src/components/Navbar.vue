<template>
    <div :class="{'fixed top-0 left-0 w-full z-10 backdrop-filter backdrop-blur-sm bg-opacity-30  text-black': transparent, ' bg-indigo-500 text-white': !transparent}">
    <div class=" container mx-auto px-4">
      <!-- Botó per a desplegar la navegació en pantalles petites -->
      <button @click="drawer = !drawer" class="md:hidden p-4 focus:outline-none  rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <!-- Logo o títol de la barra de navegació -->
      <div class=" flex justify-between items-center">
        <h1 class="py-4 text-2xl font-bold">ICONA</h1>
        <div class="hidden md:flex space-x-6">
<!--          <router-view>-->
            <router-link to="/" class="flex items-center text-lg font-semibold hover:text-indigo-200 transition-colors duration-300 ease-in-out">
              <span>Home</span>
            </router-link>
            <router-link to="/anime" class="flex items-center text-lg font-semibold hover:text-indigo-200 transition-colors duration-300 ease-in-out">
              <span>Anime</span>
            </router-link>
            <router-link to="/manga" class="flex items-center text-lg font-semibold hover:text-indigo-200 transition-colors duration-300 ease-in-out">
              <span>Manga</span>
            </router-link>
<!--          </router-view>-->
        </div>
        <input type="text" placeholder="Search..." class="hidden md:block bg-indigo-400 text-white placeholder-gray-300 rounded-lg py-1 px-3 focus:outline-none focus:bg-indigo-300 focus:placeholder-gray-400 transition-all duration-300 ease-in-out">
      </div>
    </div>

<!--     Navegació en Drawer per a pantalles petites-->
    <div v-if="drawer" class="md:hidden backdrop-blur-sm backdrop-filter bg-opacity-30 p-4 text-black">
      <router-link to="/" class=" block py-2 flex items-center space-x-2 text-lg font-semibold hover:text-indigo-200 transition-colors duration-300 ease-in-out">
        <span>Home</span>
      </router-link>
      <router-link to="/anime" class="block py-2 flex items-center space-x-2 text-lg font-semibold hover:text-indigo-200 transition-colors duration-300 ease-in-out">
        <span>Anime</span>
      </router-link>
      <router-link to="/manga" class="block py-2 flex items-center space-x-2 text-lg font-semibold hover:text-indigo-200 transition-colors duration-300 ease-in-out">
        <span>Manga</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    transparent: Boolean,
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped>
/* Estils addicionals */
.input-placeholder::placeholder {
  color: #9CA3AF; /* Canvia a qualsevol color més fort que vulguis */
}

</style>
