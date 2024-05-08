<template>
  <Navbar :transparent="isTransparent"></Navbar>
  <router-view @update-navbar-style="handleNavbarStyle"></router-view>
  <Footer></Footer>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const isTransparent = ref(false);

function handleNavbarStyle({ transparent }) {
  isTransparent.value = transparent;
}
</script>
