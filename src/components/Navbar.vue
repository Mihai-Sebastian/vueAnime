<template>
  <div :class="{'fixed top-0 left-0 w-full z-10 backdrop-filter backdrop-blur-lg bg-opacity-20 text-black shadow-lg': transparent, 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md': !transparent}">
    <div class="container mx-auto px-4">
      <!-- Botón para desplegar la navegación en pantallas pequeñas -->
      <button @click="drawer = !drawer" class="md:hidden p-4 focus:outline-none rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <!-- Logo o título de la barra de navegación -->
      <div class="flex justify-between items-center">
        <h1 class="py-4 text-2xl font-bold">ICONA</h1>
        <div class="hidden md:flex space-x-6">
          <!-- Enlaces de navegación desktop -->
          <router-link to="/" class="flex items-center text-lg font-semibold hover:text-blue-200 transition-colors duration-300 ease-in-out">
            Home
          </router-link>
          <router-link to="/anime" class="flex items-center text-lg font-semibold hover:text-blue-200 transition-colors duration-300 ease-in-out">
            Anime
          </router-link>
          <router-link to="/manga" class="flex items-center text-lg font-semibold hover:text-blue-200 transition-colors duration-300 ease-in-out">
            Manga
          </router-link>
        </div>
        <input type="text" placeholder="Search..." class="hidden md:block bg-transparent text-white placeholder-gray-300 rounded-lg py-1 px-3 focus:outline-none focus:bg-white focus:text-black transition-all duration-300 ease-in-out">
      </div>
    </div>

    <!-- Navegación en Drawer para pantallas pequeñas -->
    <div v-if="drawer" class="md:hidden backdrop-blur-lg backdrop-filter bg-opacity-20 p-4 text-black">
      <!-- Enlaces de navegación móvil -->
      <router-link to="/" class="block py-2 flex items-center space-x-2 text-lg font-semibold hover:text-blue-200 transition-colors duration-300 ease-in-out" @click.native="drawer = false">
        Home
      </router-link>
      <router-link to="/anime" class="block py-2 flex items-center space-x-2 text-lg font-semibold hover:text-blue-200 transition-colors duration-300 ease-in-out" @click.native="drawer = false">
        Anime
      </router-link>
      <router-link to="/manga" class="block py-2 flex items-center space-x-2 text-lg font-semibold hover:text-blue-200 transition-colors duration-300 ease-in-out" @click.native="drawer = false">
        Manga
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
  methods: {
    closeDrawer() {
      this.drawer = false;
    }
  }
};
</script>
