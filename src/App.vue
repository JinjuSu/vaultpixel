<template>
  <div class="container">
    <nav>
      <img src="./assets/vaultpixel-logo.png" alt="logo" class="image-logo" />
      <router-link to="/">Home</router-link> |
      <router-link to="/products">Products</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
