<template>
  <div class="min-h-screen bg-gray-100">
    <div class="py-10">
      <h1 class="text-3xl font-semibold text-center">Cerca Manga</h1>
    </div>

    <div class="search-container p-6 mx-auto max-w-7xl">
      <input type="text" v-model="searchQuery" @input="debouncedSearch" placeholder="Buscar manga..." class="w-full px-4 py-2 text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">

      <div class="anime-grid mt-6 grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div class="anime-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" v-for="anime in searchResults" :key="anime.id" @click="goToAnimeDetail(anime.id)" style="height: 100%;">
          <div class="w-full h-56 flex justify-center items-center overflow-hidden">
            <img :src="anime.coverImage.large" alt="Cover image" class="min-h-full min-w-full object-cover object-center">
          </div>
          <div class="p-4">
            <p class="text-lg font-semibold text-gray-800">{{ anime.title.romaji }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { debounce } from '../debounce.js'; // Importa la función debounce

// La barra de búsqueda inicia vacía.
const searchQuery = ref('');
const searchResults = ref([]);
const router = useRouter();

const url = 'https://graphql.anilist.co';

// Función para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};

// Función para manejar errores
const handleError = (error) => {
  alert('Error, check console');
  console.error(error);
};

// Función para realizar la búsqueda
const fetchAnime = (searchText) => {
  const searchQueryText = `
    query ($search: String) {
        Page {
            media (search: $search, type: MANGA, isAdult: false) {
                id
                title {
                    romaji
                    english
                    native
                }
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
            }
        }
    }
  `;

  const variables = {
    search: searchText
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: searchQueryText,
      variables: variables
    })
  };

  fetch(url, options)
      .then(handleResponse)
      .then(data => {
        searchResults.value = data.data.Page.media;
      })
      .catch(handleError);
};

// Función que se ejecuta al buscar
const searchAnime = () => {
  if (searchQuery.value.trim() === '') {
    // Si la barra de búsqueda está vacía, mostrar el contenido predeterminado
    fetchAnime('Dragon Ball');
  } else {
    // Realizar la búsqueda basada en la entrada del usuario
    fetchAnime(searchQuery.value);
  }
};

// Navegar a la página de detalle
const goToAnimeDetail = (id) => {
  router.push({ name: 'MangaDetail', params: { id } });
};

// Crear una función debounced para la búsqueda
const debouncedSearch = debounce(searchAnime, 300);

// Cargar el conjunto de resultados predeterminados al montar el componente
onMounted(() => {
  fetchAnime('Dragon Ball');
});
</script>
