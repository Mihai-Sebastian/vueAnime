<template>
  <div :class="{'fixed top-0 left-0 w-full z-10 backdrop-filter backdrop-blur-lg bg-opacity-20 text-black shadow-lg': transparent, 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md': !transparent}">
    <div class="container mx-auto px-4">
      <!-- Botón para desplegar la navegación en pantallas pequeñas -->
      <button @click="drawer = !drawer" class="md:hidden p-4 focus:outline-none rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <!-- título de la barra de navegación -->
      <div class="flex justify-between items-center">
        <h1 class="py-4 text-2xl font-bold">ANILIST</h1>
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
        <!-- Campo de búsqueda actualizado -->
        <input type="text" placeholder="Search..." class="hidden md:block bg-transparent text-white placeholder-gray-300 rounded-lg py-1 px-3 focus:outline-none focus:bg-white focus:text-black transition-all duration-300 ease-in-out" v-model="searchQuery" @input="search">
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

    <!-- Mostrar resultados de la búsqueda -->
    <div v-if="showSearchResults" class="absolute bg-gray-800 bg-opacity-75 text-white shadow-md rounded-lg mt-1 w-4/5 left-1/2 transform -translate-x-1/2 z-50 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-if="searchResults.anime.length" class="anime-results">
        <h3 class="px-4 py-2 text-lg">Anime</h3>
        <ul>
          <li v-for="anime in searchResults.anime" :key="anime.id" class="p-2 hover:bg-gray-700 flex items-center" @click="goToDetail(anime.id, 'ANIME')">
            <img :src="anime.coverImage.medium" alt="Cover" class="inline-block h-10 w-10 rounded-full mr-2">
            {{ anime.title.userPreferred }}
          </li>
        </ul>
      </div>
      <div v-if="searchResults.manga.length" class="manga-results">
        <h3 class="px-4 py-2 text-lg">Manga</h3>
        <ul>
          <li v-for="manga in searchResults.manga" :key="manga.id" class="p-2 hover:bg-gray-700 flex items-center" @click="goToDetail(manga.id, 'MANGA')">
            <img :src="manga.coverImage.medium" alt="Cover" class="inline-block h-10 w-10 rounded-full mr-2">
            {{ manga.title.userPreferred }}
          </li>
        </ul>
      </div>
      <div v-if="searchResults.users.length" class="user-results">
        <h3 class="px-4 py-2 text-lg">Users</h3>
        <ul>
          <li v-for="user in searchResults.users" :key="user.id" class="p-2 hover:bg-gray-700 flex items-center" @click="goToUserDetail(user.id)">
            <img :src="user.avatar.medium" alt="User" class="inline-block h-10 w-10 rounded-full mr-2">
            {{ user.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { debounce } from '../debounce.js'; // Importa la función debounce

export default {
  name: 'Navbar',
  props: {
    transparent: Boolean,
  },
  data() {
    return {
      drawer: false,
      searchQuery: '',
      searchResults: {
        anime: [],
        manga: [],
        users: []
      },
      isSearching: false
    };
  },
  computed: {
    showSearchResults() {
      return !this.isSearching && (this.searchResults.anime.length || this.searchResults.manga.length || this.searchResults.users.length);
    }
  },
  methods: {
    closeDrawer() {
      this.drawer = false;
    },
    search: debounce(async function() {
      if (!this.searchQuery.trim()) {
        this.searchResults = {
          anime: [],
          manga: [],
          users: []
        };
        return;
      }
      this.isSearching = true;
      const query = `
      query ($search: String) {
        anime: Page(page: 1, perPage: 5) {
          media(search: $search, type: ANIME) {
            id
            title {
              userPreferred
            }
            coverImage {
              medium
            }
          }
        }
        manga: Page(page: 1, perPage: 5) {
          media(search: $search, type: MANGA) {
            id
            title {
              userPreferred
            }
            coverImage {
              medium
            }
          }
        }
        users: Page(page: 1, perPage: 5) {
          users(search: $search) {
            id
            name
            avatar {
              medium
            }
          }
        }
      }`;

      try {
        const response = await axios.post('https://graphql.anilist.co',
            {
              query: query,
              variables: {
                search: this.searchQuery
              }
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            });
        this.searchResults = {
          anime: response.data.data.anime.media,
          manga: response.data.data.manga.media,
          users: response.data.data.users.users
        };
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        this.isSearching = false;
      }
    }, 300),
    goToDetail(id, type) {
      const routeName = type === 'ANIME' ? 'AnimeDetail' : 'MangaDetail';
      this.$router.push({ name: routeName, params: { id } });
    },
    goToUserDetail(userId) {
      this.$router.push({ name: 'UserDetail', params: { id: userId } });
    }
  },
  mounted() {
    const router = this.$router;
    router.afterEach(() => {
      this.searchQuery = '';
      this.searchResults = {
        anime: [],
        manga: [],
        users: []
      };
    });
  }
};
</script>

<style scoped>
.anime-results, .manga-results, .user-results {
  background-color: #1e293b;
  border-radius: 0.5rem;
  padding: 1rem;
}
h3 {
  margin-bottom: 0.5rem;
}
</style>
