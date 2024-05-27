import { createRouter, createWebHistory } from 'vue-router'
import App from "@/App.vue";
import Anime from "@/views/Anime.vue";
import Manga from "@/views/Manga.vue";
import Home from "@/views/Home.vue";
import AnimeDetail from "@/views/AnimeDetail.vue";
import MangaDetail from "@/views/MangaDetail.vue";
import UserDetail from "@/views/UserDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/anime',
      name: 'anime',
      component: Anime
    },
    {
      path: '/manga',
      name: 'manga',
      component: Manga
    },
    {
      path: '/anime/:id',
      name: 'AnimeDetail',
      component: AnimeDetail,
      props: true
    },
    {
      path: '/manga/:id',
      name: 'MangaDetail',
      component: MangaDetail,
      props: true
    },
    {
      path: '/user/:id',
      name: 'UserDetail',
      component: UserDetail,
      props: true
    },
  ]
})

export default router
