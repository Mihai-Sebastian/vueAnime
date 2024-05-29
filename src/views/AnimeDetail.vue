<template>
  <div v-if="anime">
    <!-- Banner -->
    <div class="relative banner h-60 lg:h-96" :style="{ backgroundImage: `url(${anime.bannerImage || '/public/img/banner.png'})` }">
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
      <div class="flex justify-center items-center h-full relative">
        <div class="bg-black bg-opacity-50 px-4 py-2 rounded">
          <h1 class="text-white text-2xl lg:text-4xl font-bold">{{ anime.title.romaji }}</h1>
        </div>
      </div>
    </div>

    <div class="anime-detail bg-white shadow-lg max-w-5xl mx-auto mt-8 p-8 rounded-lg">
      <div class="flex flex-col lg:flex-row gap-4">
        <img :src="anime.coverImage.large" :alt="`Cover image of ${anime.title.romaji}`" class="cover-image w-full lg:w-1/4 max-h-80 rounded-lg">
        <div class="flex flex-col p-4 lg:w-3/4">
          <p class="text-gray-700 text-base leading-relaxed description" v-html="anime.description"></p>
        </div>
      </div>
    </div>

    <!-- Relations -->
    <div class="relations-container max-w-5xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Relations</h2>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div class="relation-card" v-for="relation in anime.relations.edges" :key="relation.node.id" @click="goToMediaDetail(relation.node.id, relation.node.type)">
          <img :src="relation.node.coverImage.large" :alt="relation.node.title.romaji" class="w-full h-40 object-cover rounded-lg">
          <div class="text-center mt-2">{{ relation.node.title.romaji }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading text-center p-20">
    Loading...
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const anime = ref(null);

onMounted(() => {
  fetchAnimeDetail();
});

watch(() => route.params.id, (newId, oldId) => {
  if (newId !== oldId) {
    fetchAnimeDetail();
  }
});

const fetchAnimeDetail = async () => {
  const id = route.params.id;
  const url = `https://graphql.anilist.co`;

  const query = `
            query ($id: Int) {
      Media(id: $id, type: ANIME) {
          id
          title {
              romaji
              english
              native
          }
          bannerImage
          coverImage {
              large
          }
          description(asHtml: true)
          relations {
            edges {
              node {
                id
                title {
                  romaji
                }
                coverImage {
                  large
                }
                type
              }
              relationType
            }
          }
      }
  }
  `;

  const variables = { id: parseInt(id) };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query, variables })
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Network response was not ok');
    const { data } = await response.json();
    anime.value = data.Media;
  } catch (error) {
    console.error('Error fetching anime details:', error);
  }
};

const goToMediaDetail = (id, type) => {
  const routeName = type === 'ANIME' ? 'AnimeDetail' : 'MangaDetail';
  router.push({ name: routeName, params: { id } });
};
</script>


<style scoped>
/* Estilo para el banner */
.banner {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

/* Estilo para la imagen de portada */
.cover-image {
  object-fit: cover;
}

/* Estilo para la sección de relaciones */
.relations-container {
  padding: 20px;
}
.relation-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.relation-card:hover {
  transform: scale(1.05);
}

/* Estilo para la descripción */
.description {
  overflow: auto;
  max-height: 300px;
}
</style>
