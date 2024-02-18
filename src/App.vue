<template>
  <div class="min-h-screen mt-0 pt-5 px-5 pb-5">
    <RandomUsers />
  </div>
</template>

<script>
import RandomUsers from "./components/RandomUsers.vue";

export default {
  name: "App",
  components: {
    RandomUsers,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
