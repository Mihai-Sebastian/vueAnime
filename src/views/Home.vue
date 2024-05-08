<template>
  <div>
    <!-- Secció Superior: Ocupa tota la pantalla inicial -->
    <div class="relative flex items-center justify-center h-screen bg-cover bg-center bg-fixed"
         :style="{ backgroundImage: 'url(/img/fondo.jpg)' }">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative z-10 text-center p-8 text-white">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Benvingut a la nostra web</h1>
        <p class="text-lg md:text-2xl max-w-xl mx-auto">
          Explora els nostres serveis i gaudeix d'una experiència única amb la nostra plataforma!
        </p>
      </div>
    </div>

    <!-- Secció Inferior: Apareix fent scroll cap avall -->
    <div class="relative flex items-center justify-center min-h-screen bg-cover bg-center"
         :style="{ backgroundImage: 'url(/img/fondo2.jpg)' }">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative z-10 text-center p-8 text-white">
        <h2 class="text-3xl md:text-5xl font-bold mb-4">Descobreix més</h2>
        <p class="text-md md:text-xl max-w-xl mx-auto">
          Informació addicional sobre altres serveis o característiques interessants.
        </p>
      </div>
    </div>
  </div>
</template>

<style>
/* Aquí pots afegir estils globals o ajustar els estils específics si és necessari */
</style>
