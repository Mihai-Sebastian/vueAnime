<template>
  <div v-if="user">
    <!-- Banner -->
    <div class="relative banner h-60 lg:h-96" :style="{ backgroundImage: `url(${user.bannerImage || '/public/img/banner.png'})` }">
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
      <div class="flex justify-center items-center h-full relative">
        <div class="bg-black bg-opacity-50 px-4 py-2 rounded">
          <h1 class="text-white text-2xl lg:text-4xl font-bold">{{ user.name }}</h1>
        </div>
      </div>
    </div>

    <div class="user-detail bg-white shadow-lg max-w-5xl mx-auto mt-8 p-8 rounded-lg">
      <div class="flex flex-col lg:flex-row gap-4">
        <img :src="user.avatar.large" :alt="`Avatar of ${user.name}`" class="avatar-image w-full lg:w-1/4 max-h-80 rounded-lg">
        <div class="flex flex-col p-4 lg:w-3/4">
          <div class="text-gray-700 text-base leading-relaxed">
            <p><strong>Username:</strong> {{ user.name }}</p>

          </div>
        </div>
      </div>
    </div>

    <!-- Anime List Section -->
    <div class="anime-list-container max-w-5xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Animes Watched</h2>
      <div v-for="list in animeLists" :key="list.name" class="mb-6">
        <h3 class="text-lg font-bold mb-2">{{ list.name }}</h3>
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div class="anime-card" v-for="anime in list.entries" :key="anime.media.id" @click="goToDetail(anime.media.id)">
            <img :src="anime.media.coverImage.large" :alt="anime.media.title.romaji" class="w-full h-40 object-cover rounded-lg">
            <div class="text-center mt-2">{{ anime.media.title.romaji }}</div>
          </div>
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
const user = ref(null);
const animeLists = ref([]);

onMounted(() => {
  fetchUserDetail();
  fetchAnimeList();
});

watch(() => route.params.id, (newId, oldId) => {
  if (newId !== oldId) {
    fetchUserDetail();
    fetchAnimeList();
  }
});

const fetchUserDetail = async () => {
  const id = route.params.id;
  const url = `https://graphql.anilist.co`;

  const query = `
    query ($id: Int) {
      User(id: $id) {
        id
        name
        avatar {
          large
        }
        bannerImage
        about
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
    user.value = data.User;
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
};

const fetchAnimeList = async () => {
  const id = route.params.id;
  const url = `https://graphql.anilist.co`;

  const query = `
    query ($id: Int) {
      MediaListCollection(userId: $id, type: ANIME) {
        lists {
          name
          entries {
            media {
              id
              title {
                romaji
                english
                native
              }
              episodes
              status
              coverImage {
                large
              }
            }
            score
            status
            progress
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
    animeLists.value = data.MediaListCollection.lists;
  } catch (error) {
    console.error('Error fetching anime list:', error);
  }
};

const goToDetail = (id) => {
  router.push({ name: 'AnimeDetail', params: { id } });
};
</script>

<style scoped>
/* Estilo per al banner */
.banner {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

/* Estilo per a la imatge d'avatar */
.avatar-image {
  object-fit: cover;
}

/* Estilo per a la secció d'animes */
.anime-list-container {
  padding: 20px;
}
.anime-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.anime-card:hover {
  transform: scale(1.05);
}

/* Estilo per a la descripció */
.description {
  overflow: auto;
  max-height: 300px;
}
</style>
